import { Linkedin, Mail, ArrowUp } from 'lucide-react'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js &amp; Tailwind.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition hover:text-navy"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition hover:text-navy"
          >
            <Mail size={18} />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:border-navy/40 hover:text-navy"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
