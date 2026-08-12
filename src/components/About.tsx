import { Cpu, Boxes, MessagesSquare } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { profile } from '../data/content'

const focus = [
  {
    icon: MessagesSquare,
    title: 'Grounded LLMs & RAG',
    body: 'Retrieval-augmented assistants with hallucination guards, tool-calling, and semantic search.',
  },
  {
    icon: Cpu,
    title: 'Deep Learning',
    body: 'NLP, speech (ASR/TTS), and computer vision - fine-tuning and shipping real models.',
  },
  {
    icon: Boxes,
    title: 'Full-Stack Delivery',
    body: 'Containerized apps with Python backends, React frontends, and clean APIs.',
  },
]

export default function About() {
  return (
    <section id="about" className="section bg-grid">
      <div className="container-x">
        <SectionHeader
          eyebrow="About"
          title="Turning models into products"
          description={profile.summary}
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {focus.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card h-full p-6 hover:-translate-y-1 hover:border-navy/30 hover:shadow-xl hover:shadow-navy/5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy/5 text-navy">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
