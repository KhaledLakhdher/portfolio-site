import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dev-only middleware that mirrors the Vercel serverless function at /api/chat,
 * so the AI assistant works during `npm run dev`. It loads api/chat.ts through
 * Vite's SSR pipeline (which understands TypeScript + imports).
 */
function devApiChat(): Plugin {
  return {
    name: 'dev-api-chat',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url ?? '').split('?')[0] !== '/api/chat') return next()
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json')
          try {
            const { messages } = JSON.parse(body || '{}')
            const mod = await server.ssrLoadModule('/api/chat.ts')
            const { reply } = await mod.generateReply(messages)
            res.end(JSON.stringify({ reply }))
          } catch (e: any) {
            const message = String(e?.message ?? e)
            res.statusCode = message === 'NO_KEY' ? 501 : 500
            res.end(JSON.stringify({ error: message }))
          }
        })
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Expose selected server-side env vars (from .env) to the dev middleware.
  const env = loadEnv(mode, process.cwd(), '')
  for (const k of ['OPENROUTER_API_KEY', 'OPENROUTER_MODEL', 'SITE_URL'] as const) {
    if (env[k]) process.env[k] = env[k]
  }

  return {
    plugins: [react(), devApiChat()],
    server: {
      port: 5173,
      open: true,
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return
            if (id.includes('three') || id.includes('@react-three')) return 'three'
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            if (id.includes('framer-motion')) return 'motion'
          },
        },
      },
    },
  }
})
