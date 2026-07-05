import { Mail, Linkedin, MapPin, Phone, FileDown, ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import { profile } from '../data/content'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-paper sm:px-12 sm:py-20">
            {/* soft glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="eyebrow text-white/70">
                <span className="h-px w-6 bg-white/60" />
                Contact
              </span>
              <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let's build something intelligent together.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
                Open to AI / ML engineering roles, internships, and freelance work. The fastest way
                to reach me is email or LinkedIn.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn bg-paper text-navy hover:bg-white"
                >
                  <Mail size={16} /> {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn border border-white/25 text-paper hover:bg-white/10"
                >
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
                </a>
                <a
                  href={profile.resumeEn}
                  download
                  className="btn border border-white/25 text-paper hover:bg-white/10"
                >
                  <FileDown size={16} /> Resume (EN)
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-paper/60">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {profile.location}
                </span>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  <Phone size={14} /> {profile.phone}
                </a>
                <a href={profile.resumeFr} download className="inline-flex items-center gap-1.5 hover:text-white">
                  <FileDown size={14} /> CV (FR)
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
