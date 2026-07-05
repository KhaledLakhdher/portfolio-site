# Khaled Lakhdher — Portfolio

A minimal, professional portfolio with a 3D distorted-blob hero. Built with **React + Vite + TypeScript**, **React Three Fiber** (`@react-three/fiber` + `drei`) for the 3D, **Tailwind CSS**, and **Framer Motion**.

## Quick start

```bash
npm install      # install dependencies (already done)
npm run dev      # start dev server → http://localhost:5173
```

Other scripts:

```bash
npm run build    # typecheck (tsc) + production build → dist/
npm run preview  # serve the built dist/ locally
npm run lint     # typecheck only
```

## Editing your content

Everything on the page is driven by one file:

```
src/data/content.ts
```

Update your profile, experience, projects, skills, certifications, education, languages,
and the headline stats there — no need to touch the components.

Your résumés are served from `public/resume/` and linked from the navbar, hero, and contact
section. To refresh them, replace:

- `public/resume/Khaled_Lakhdher_CV_EN.pdf`
- `public/resume/Khaled_Lakhdher_CV_FR.pdf`

## Structure

```
src/
├─ data/content.ts          # all site content (edit here)
├─ components/
│  ├─ three/
│  │  ├─ Hero3D.tsx         # lazy-loads the scene + WebGL/CSS fallback
│  │  ├─ Scene.tsx          # <Canvas>, lights, procedural studio env
│  │  └─ Blob.tsx           # the distorted glossy sphere
│  ├─ ui/                   # Reveal (scroll anim), SectionHeader
│  ├─ Navbar / Hero / About / Experience / Projects
│  ├─ Skills / Background / Contact / Footer
├─ hooks/useMediaQuery.ts   # reduced-motion + mobile helpers
├─ App.tsx
└─ index.css                # Tailwind + design tokens
```

## Notes on the 3D

- The hero uses a **procedural studio environment** (drei `Lightformer`s) — no external HDRI is
  downloaded, so it works offline and under strict CSP.
- Honors `prefers-reduced-motion`: animation is paused and the frameloop switches to on-demand.
- Falls back to a soft CSS gradient if WebGL is unavailable.
- Tune the look in `Blob.tsx` (`color`, `distort`, `speed`, `metalness`, `roughness`).

## AI assistant ("Chat with my AI")

The `#ai` section is a retrieval-grounded chatbot that answers **only** from your CV
content (`src/data/knowledge.ts`, built from `content.ts`). It calls **OpenRouter**
through a serverless function so your API key never reaches the browser.

**How it degrades gracefully:**
- **With a key** → real LLM answers via OpenRouter.
- **Without a key / offline / any error** → automatic client-side retrieval fallback
  (returns the most relevant CV snippets). So the section always works.

### Local setup

1. Get a key at <https://openrouter.ai/keys>.
2. Copy `.env.example` → `.env` and fill it in:
   ```bash
   cp .env.example .env
   ```
   ```
   OPENROUTER_API_KEY=sk-or-...
   OPENROUTER_MODEL=openai/gpt-4o-mini
   ```
3. `npm run dev` — the dev server proxies `/api/chat` to OpenRouter for you.

> No key yet? It still runs — the chat just uses the free offline fallback.

### Files

```
api/chat.ts        # Vercel serverless function: POST /api/chat
api/_core.ts       # shared OpenRouter call + grounding prompt
src/data/knowledge.ts   # CV knowledge base + offline retrieval
src/components/Chat.tsx  # chat UI
```

## Deploy to Vercel

`vercel.json` is already configured (framework: Vite, output: `dist`).

**Set the AI key in production:** Vercel → Project → **Settings → Environment Variables** →
add `OPENROUTER_API_KEY` (and optionally `OPENROUTER_MODEL`, `SITE_URL`). Redeploy.
Without it, the live site simply uses the offline fallback.

**Option A — Git (recommended):**

1. Push this folder to a GitHub repo.
2. On [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Vite; just click **Deploy**.

**Option B — CLI:**

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

Add a custom domain in the Vercel dashboard under **Settings → Domains**.
