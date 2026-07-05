import { Briefcase } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { experiences } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Experience"
          title="Where I've worked"
          description="Applied AI roles building and shipping real systems."
        />

        <div className="mt-8 space-y-5">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 0.06}>
              <article className="card group grid gap-6 p-6 hover:border-navy/30 hover:shadow-xl hover:shadow-navy/5 sm:grid-cols-[200px_1fr] sm:p-8">
                <div className="sm:border-r sm:border-line sm:pr-6">
                  <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-navy/5 text-navy">
                    <Briefcase size={18} />
                  </div>
                  <p className="text-sm font-semibold text-navy">{exp.period}</p>
                  <p className="mt-1 text-sm text-muted">{exp.location}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy">{exp.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent">{exp.company}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
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
