import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          title="Tools I work with"
          description="From model training to containerized deployment."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skills.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.06}>
              <div className="card h-full p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-navy">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="chip transition hover:border-navy/40 hover:bg-navy hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
