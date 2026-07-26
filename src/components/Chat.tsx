import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, ShieldCheck, Database, User } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { retrieve } from '../data/knowledge'

type Message = { id: number; role: 'user' | 'assistant'; content: string; offline?: boolean }

const suggestions = [
  'What did Khaled do at CTT?',
  'Explain the Hotel Mind project',
  'What are his strongest skills?',
  'Which certifications does he have?',
]

const greeting =
  "Hi! I'm Khaled's AI assistant, grounded in his CV. Ask me about his experience, projects, or skills - I'll only answer from what's on his portfolio."

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text: string) {
    const content = text.trim()
    if (!content || loading) return

    const userMsg: Message = { id: ++idRef.current, role: 'user', content }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setLoading(true)

    let reply = ''
    let offline = false
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      const data = await res.json()
      reply = (data.reply ?? '').trim()
      if (!reply) throw new Error('empty')
    } catch {
      // Free, offline-safe fallback: retrieve the most relevant CV snippets.
      reply = retrieve(content).answer
      offline = true
    }

    setMessages((prev) => [
      ...prev,
      { id: ++idRef.current, role: 'assistant', content: reply, offline },
    ])
    setLoading(false)
  }

  return (
    <section id="ai" className="section">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left: pitch */}
          <div className="lg:sticky lg:top-24">
            <SectionHeader
              eyebrow="AI Assistant"
              title="Chat with my AI"
              description="A retrieval-grounded assistant that answers from my CV - the same pattern behind my Hotel Mind project, running live on this page."
            />
            <ul className="mt-6 space-y-3">
              {[
                { icon: Database, text: 'Grounded in my portfolio content - no external data.' },
                { icon: ShieldCheck, text: "Won't invent facts; says so when it doesn't know." },
                { icon: Sparkles, text: 'Powered by an LLM, with an offline retrieval fallback.' },
              ].map((f) => (
                <li key={f.text} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-lg bg-navy/5 text-navy">
                    <f.icon size={15} />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: chat card */}
          <Reveal>
            <div className="card flex h-[540px] flex-col overflow-hidden !bg-white p-0 shadow-xl shadow-navy/5">
              {/* header */}
              <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-paper">
                  <Bot size={18} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-navy">Khaled's AI</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    grounded in my CV
                  </p>
                </div>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                <Bubble role="assistant" content={greeting} />

                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Bubble role={m.role} content={m.content} offline={m.offline} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && <Typing />}

                {messages.length === 0 && !loading && (
                  <div className="pt-1">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted/70">
                      Try asking
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="chip text-left transition hover:border-navy/40 hover:text-navy"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="border-t border-line p-2.5"
              >
                <div className="flex items-end gap-2 rounded-lg border border-line bg-paper px-2.5 py-1 focus-within:border-navy/40">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage(input)
                      }
                    }}
                    rows={1}
                    placeholder="Ask about my experience, projects, skills…"
                    aria-label="Ask the AI assistant"
                    className="max-h-24 flex-1 resize-none bg-transparent py-1 text-[13px] text-ink outline-none placeholder:text-muted/60"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    aria-label="Send message"
                    className="grid h-7 w-7 flex-none place-items-center rounded-md bg-navy text-paper transition hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <p className="mt-1.5 px-1 text-[11px] text-muted/70">
                  AI responses are grounded in Khaled's CV and may be imperfect.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Bubble({
  role,
  content,
  offline,
}: {
  role: 'user' | 'assistant'
  content: string
  offline?: boolean
}) {
  const isUser = role === 'user'
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <span
        className={`grid h-7 w-7 flex-none place-items-center rounded-full ${
          isUser ? 'bg-navy/10 text-navy' : 'bg-navy text-paper'
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </span>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-navy text-paper'
            : 'rounded-bl-sm border border-line bg-paper text-ink'
        }`}
      >
        {content}
        {offline && (
          <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted/70">
            offline retrieval mode
          </span>
        )}
      </div>
    </div>
  )
}

function Typing() {
  return (
    <div className="flex items-end gap-2">
      <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-navy text-paper">
        <Bot size={14} />
      </span>
      <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-paper px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted/60"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
