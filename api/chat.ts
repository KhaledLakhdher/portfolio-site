// Vercel Serverless Function: POST /api/chat
//
// Fully self-contained: NO imports outside this file. Vercel's Node function
// bundler failed to trace a previous `../src/data/knowledge` import
// (ERR_MODULE_NOT_FOUND at runtime), so the CV/portfolio knowledge is
// duplicated here on purpose. Keep this in sync with src/data/content.ts
// when profile/experience/project/skill facts change.
type Msg = { role: 'user' | 'assistant'; content: string }

const KNOWLEDGE_TEXT = `
## Profile
Khaled Lakhdher is a Computer Engineer, AI & Data Science, Full-Stack AI Developer based in Sousse, Tunisia. AI and data engineer who turns models and data into dependable products. He builds LLM and RAG systems, multi-agent platforms, and end-to-end ML pipelines, with a metrics-first focus on data quality, evaluation, and clean deployment. Comfortable across the stack: Python, SQL, FastAPI, and Docker. Contact: ing.khaledlakhdher@gmail.com, LinkedIn https://www.linkedin.com/in/khaled-lakhdher.

## Experience - AI Engineer
AI Engineer at CTT - Carthage Training & Technologies (Feb 2026 - Present, Tunisia). Started on this role as a final-year project (PFE) and continued as a full-time AI Engineer under contract after graduation. Designed and developed Hotel Mind, a multilingual, multi-agent hotel search and booking assistant: 9 LangChain/LangGraph agents call 32+ tools across 10 real SOAP endpoints for live hotel, room, and pricing data. Grounded every answer in live tool output rather than model memory, and built a hybrid booking flow (AI search, a guest-detail form, and a sandboxed SOAP reservation) on a full-stack FastAPI + Next.js app with LangSmith tracing. Technologies: LangChain, LangGraph, Multi-Agent, SOAP APIs, FastAPI, Next.js.

## Experience - AI Developer Intern
AI Developer Intern at CTT - Carthage Training & Technologies (Jul 2025 - Sep 2025, Hammamet, Tunisia). Fine-tuned a Hugging Face NLP model to classify customer reviews into three sentiment classes (positive, negative, neutral), improving accuracy by 25% over the pre-trained baseline. Built a Django backend to manage customer data and automate export of analysis results to Excel for reporting. Owned the end-to-end Python pipeline for preprocessing, training, and integration. Technologies: NLP, Hugging Face, Django, Python.

## Project - Nexus AI - Artificial Intelligence Employee Management Platform
A multi-tenant platform where LLM agents are governed like employees - scoped permissions, vector memory, orchestration, and per-agent cost tracking. Engineered a multi-tenant full-stack platform (FastAPI, PostgreSQL/pgvector, Redis, Next.js, TypeScript) where LLM agents are governed like employees: scoped IAM-style permissions enforced at the tool-execution boundary, hierarchical vector memory with semantic recall, and a provider-agnostic model gateway (Anthropic / OpenRouter-Gemini) with per-agent cost tracking. Engineered a multi-agent orchestration engine over a Redis Streams message bus with real-time WebSocket monitoring and an append-only audit log, running live agents for a fraction of a cent per run. Stack: FastAPI, pgvector, Redis Streams, Next.js, Multi-Agent, WebSockets. GitHub: https://github.com/KhaledLakhdher/startup.

## Project - Steam Player Forecaster - Production MLOps Pipeline
A production MLOps pipeline forecasting Steam player counts, with a versioned model registry, drift-triggered retraining, and live monitoring. Engineered a reproducible ML lifecycle (scikit-learn, MLflow, FastAPI, Pandera, Docker): time-based training, a versioned model registry with @champion promotion, and a registry-backed prediction API with schema-validated inputs. Added production monitoring - PSI drift detection with an automated champion/challenger retraining loop (GitHub Actions) and a CI eval gate - plus a Streamlit dashboard and a scheduled collector that keeps the system live. Stack: MLOps, MLflow, FastAPI, scikit-learn, Docker, GitHub Actions, Streamlit. GitHub: https://github.com/KhaledLakhdher/steam-player-mlops.

## Project - CodeReview Evaluation - Benchmarked LLM Code Reviewer
An AI code reviewer with a reproducible evaluation harness that separates localization from diagnosis, showing single-score benchmarks overstate true LLM capability. Developed an AI code-review pipeline (Claude API, structured JSON findings) and a reproducible evaluation harness over the BugsInPy benchmark (500 real Python bugs with ground-truth fixes), scoring localization and diagnosis as separate metrics via an LLM-as-judge. Showed a single "bug-detection" score overstates true capability ~1.8x (78% localization vs 43% diagnosis), benchmarked 3 model tiers (Opus / Sonnet / Haiku), and shipped an interactive Streamlit demo and published results page. Stack: LLM-as-a-Judge, Benchmarking, Claude API, Evaluation, Streamlit, Python. GitHub: https://github.com/KhaledLakhdher/coder_review.

## Project - Hotel Mind - Multi-Agent Travel Assistant
A multilingual, multi-agent hotel search and booking assistant grounded entirely in live SOAP data, so it never invents a price, a room, or a booking. Orchestrated 9 specialized LangChain/LangGraph agents across 32+ tools and 10 real SOAP endpoints (live hotel search, pricing, rooms, capacity, bookings), so every answer is grounded in tool output, never invented by the LLM, in any language the user writes in. Built a hybrid booking flow: AI-driven search and context-aware conversation (pronouns, follow-ups, city switches) hands off to a UI form for guest details and a sandboxed SOAP reservation returning a real voucher, on a full-stack FastAPI + Next.js app with LangSmith tracing. Stack: LangChain, LangGraph, Multi-Agent, SOAP APIs, FastAPI, Next.js, LangSmith. This project's source code is in a private repository.

## Project - Personalized Voice Assistant
A personalized voice assistant combining speech-to-text, text-to-speech, and realistic voice cloning. Fine-tuned Whisper (STT) and SpeechT5 (TTS) for a personalized voice pipeline. Realistic voice cloning via CSM-1B for natural, on-brand responses. Cut response time by 30% while improving engagement. Stack: ASR, TTS, Voice Cloning, Fine-tuning. This project's source code is in a private repository.

## Project - DecisionFlow - AI Business Analyst
Upload a spreadsheet, get a data warehouse: cleaning, a star schema, forecasts, and an analyst you can ask questions. Engineered a multi-tenant analytics platform (FastAPI, PostgreSQL, DuckDB, Polars, Redis, Next.js, TypeScript) carrying an uploaded CSV through a raw to clean to star pipeline, with tenant isolation enforced by PostgreSQL row-level security rather than application checks. Engineered the analytics layer: foreign keys inferred from value containment, Holt-Winters forecasting, MAD anomaly detection, and RFM churn scoring, fronted by a Gemini narrative layer whose generated SQL clears a three-layer sandbox and refuses rather than guesses when the data cannot support an answer. Stack: FastAPI, DuckDB, PostgreSQL, RLS, Polars, Gemini, scikit-learn, Next.js, Playwright. GitHub: https://github.com/KhaledLakhdher/DecisionFlow.

## Skills - Programming Languages
Programming Languages: Python, Java, C, SQL, JavaScript, TypeScript, React.js, React Native, HTML/CSS, Tailwind CSS.

## Skills - AI Libraries & Frameworks
AI Libraries & Frameworks: Transformers, PyTorch, TensorFlow, Keras, Hugging Face, scikit-learn, Pandas, NumPy, Matplotlib.

## Skills - Frameworks & Tools
Frameworks & Tools: Gradio, Streamlit, Flask, Django, Zeep, LangSmith, Docker Compose, Postman, Git, GitHub.

## Skills - Concepts & Technologies
Concepts & Technologies: RAG, Retrieval-Augmented Generation, AI Agents, Agentic AI, Tool-Calling, Prompt Engineering, LLM Evaluation, LLM-as-a-Judge, LLMs, NLP, ASR, GANs, Semantic Search, Embeddings, Deep Learning, NoSQL, Cloud Computing.

## Certifications
Fundamentals of Deep Learning (NVIDIA, Nov 2022); Building Transformer-Based NLP Applications (NVIDIA, Dec 2025); Applications of AI for Predictive Maintenance (NVIDIA, Oct 2025); CCNA 1: Introduction to Networks (Cisco Networking Academy, Mar 2024); CCNA 2: Switching, Routing & Wireless Essentials (Cisco Networking Academy, Mar 2024).

## Education
Computer Engineering - AI & Data Science at EPI - International Polytechnic School (2023 - 2026, Sousse, Tunisia); Preparatory Cycle at EPI - Private International Polytechnic School (2021 - 2023, Sousse, Tunisia).

## Languages
French: DELF B2, English: TOEIC 825/990, Arabic: Native.
`.trim()

const SYSTEM_PROMPT = `You are the portfolio assistant for Khaled Lakhdher, an AI Engineer.
Answer questions about Khaled using ONLY the CONTEXT below.

Rules:
- Ground every answer strictly in the CONTEXT. Never invent employers, dates, numbers, tools, or facts.
- If the answer is not in the CONTEXT, say you don't have that detail and suggest contacting Khaled via his email or LinkedIn.
- Refer to Khaled in the third person. Be concise (2-4 sentences), friendly, and professional.
- You may summarize and connect facts across the CONTEXT, but do not speculate.

CONTEXT:
${KNOWLEDGE_TEXT}`

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

  // Free models occasionally return 429 - retry once briefly.
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

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  const reply = data.choices?.[0]?.message?.content?.trim()
  if (!reply) throw new Error('Empty response from model')

  return { reply }
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {}
    const { reply } = await generateReply(body.messages)
    res.status(200).json({ reply })
  } catch (e: any) {
    const message = String(e?.message ?? e)
    // 501 = not configured (no key) -> client falls back to offline retrieval.
    res.status(message === 'NO_KEY' ? 501 : 500).json({ error: message })
  }
}
