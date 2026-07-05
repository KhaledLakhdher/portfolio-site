import { GraduationCap, Award, Languages as LangIcon } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { education, certifications, languages } from '../data/content'

export default function Background() {
  return (
    <section id="background" className="section bg-grid">
      <div className="container-x">
        <SectionHeader
          eyebrow="Background"
          title="Education & credentials"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Education */}
          <Reveal>
            <div className="card h-full p-6">
              <div className="flex items-center gap-2 text-navy">
                <GraduationCap size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Education</h3>
              </div>
              <div className="mt-5 space-y-5">
                {education.map((e) => (
                  <div key={e.degree} className="border-l-2 border-line pl-4">
                    <p className="text-[13px] font-semibold text-accent">{e.period}</p>
                    <h4 className="mt-0.5 text-sm font-bold text-navy">{e.degree}</h4>
                    <p className="mt-0.5 text-sm text-muted">{e.school}</p>
                    <p className="text-xs text-muted/80">{e.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.08}>
            <div className="card h-full p-6">
              <div className="flex items-center gap-2 text-navy">
                <Award size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Certifications</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {certifications.map((c) => (
                  <li key={c.name} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent/60" />
                    <div>
                      <p className="text-sm font-medium leading-snug text-navy">{c.name}</p>
                      <p className="text-xs text-muted">
                        {c.issuer} · {c.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal delay={0.16}>
            <div className="card h-full p-6">
              <div className="flex items-center gap-2 text-navy">
                <LangIcon size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-wider">Languages</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {languages.map((l) => (
                  <li key={l.language} className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-navy">{l.language}</span>
                    <span className="chip">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
