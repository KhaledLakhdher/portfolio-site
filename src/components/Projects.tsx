import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="section bg-grid">
      <div className="container-x">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          description="A few systems I've designed and built end-to-end."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="card group flex h-full flex-col p-6 hover:-translate-y-1.5 hover:border-navy/30 hover:shadow-2xl hover:shadow-navy/10">
                <div className="flex items-start justify-between">
                  <span className="chip border-accent/20 bg-accent/5 text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                  />
                </div>

                <h3 className="mt-4 text-lg font-bold leading-snug text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>

                <ul className="mt-4 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-accent/60" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  {(p.github || p.demo) && (
                    <div className="mb-3 flex flex-wrap gap-4 text-[13px] font-semibold">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-navy transition hover:text-accent"
                        >
                          <Github size={15} /> GitHub
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-navy transition hover:text-accent"
                        >
                          <ExternalLink size={15} /> Live demo
                        </a>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
