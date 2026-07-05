import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="eyebrow">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </span>
      <h2 className="heading mt-3">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  )
}
