// Vercel Serverless Function: POST /api/chat
// Loose types keep this dependency-free (no @vercel/node needed).
import { generateReply } from './_core'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}
    const { reply } = await generateReply(body.messages)
    res.status(200).json({ reply })
  } catch (e: any) {
    const message = String(e?.message ?? e)
    // 501 = not configured (no key) → client falls back to offline retrieval.
    res.status(message === 'NO_KEY' ? 501 : 500).json({ error: message })
  }
}
