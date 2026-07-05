import { useEffect, useState } from 'react'
import { Menu, X, FileDown } from 'lucide-react'
import { profile } from '../data/content'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#ai', label: 'Ask AI' },
  { href: '#skills', label: 'Skills' },
  { href: '#background', label: 'Background' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight text-navy">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-sm text-paper">
            KL
          </span>
          <span className="hidden sm:inline">Khaled Lakhdher</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-sm font-medium text-muted hover:text-navy"
            >
              {l.label}
            </a>
          ))}
          <a href={profile.resumeEn} download className="btn-primary text-sm">
            <FileDown size={16} /> Resume
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <div className="container-x flex flex-col py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium text-muted hover:text-navy"
              >
                {l.label}
              </a>
            ))}
            <a
              href={profile.resumeEn}
              download
              className="btn-primary mt-2 self-start text-sm"
              onClick={() => setOpen(false)}
            >
              <FileDown size={16} /> Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
