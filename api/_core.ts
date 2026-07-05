// Shared chat logic used by both the Vercel serverless function (api/chat.ts)
// and the local Vite dev middleware. Calls OpenRouter (OpenAI-compatible) and
// grounds the model in Khaled's portfolio content.
import { knowledgeText } from '../src/data/knowledge'

type Msg = { role: 'user' | 'assistant'; content: string }

const SYSTEM_PROMPT = `You are the portfolio assistant for Khaled Lakhdher, an AI Engineer.
Answer questions about Khaled using ONLY the CONTEXT below.

Rules:
- Ground every answer strictly in the CONTEXT. Never invent employers, dates, numbers, tools, or facts.
- If the answer is not in the CONTEXT, say you don't have that detail and suggest contacting Khaled via his email or LinkedIn.
- Refer to Khaled in the third person. Be concise (2–4 sentences), friendly, and professional.
- You may summarize and connect facts across the CONTEXT, but do not speculate.

CONTEXT:
${knowledgeText}`

/** Keep the payload small and safe: recent turns only, trimmed content. */
function sanitize(messages: unknown): Msg[] {
  if (!Array.isArray(messages)) return []
  return messages
    .filter(
      (m): m is Msg =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }))
}

export async function generateReply(rawMessages: unknown): Promise<{ reply: string }> {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) throw new Error('NO_KEY')

  const messages = sanitize(rawMessages)
  if (messages.length === 0) throw new Error('No messages provided')

  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-oss-20b:free'

  const payload = JSON.stringify({
    model,
    max_tokens: 450,
    temperature: 0.3,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
  })

  // Free models are occasionally rate-limited (429) — retry once briefly.
  let res!: Response
  for (let attempt = 0; attempt < 2; attempt++) {
    res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
        'X-Title': 'Khaled Lakhdher Portfolio',
      },
      body: payload,
    })
    if (res.status !== 429) break
    if (attempt === 0) await new Promise((r) => setTimeout(r, 1500))
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`OpenRouter ${res.status}: ${detail.slice(0, 300)}`)
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[]
  }
  const reply = data.choices?.[0]?.message?.content?.trim()
  if (!reply) throw new Error('Empty response from model')

  return { reply }
}
