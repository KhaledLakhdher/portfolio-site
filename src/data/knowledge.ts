import {
  profile,
  experiences,
  projects,
  skills,
  certifications,
  education,
  languages,
} from './content'

export type Chunk = { title: string; text: string }

/** Structured knowledge chunks built from the portfolio content. */
export const chunks: Chunk[] = [
  {
    title: 'Profile',
    text: `${profile.name} is a ${profile.roles.join(', ')} based in ${profile.location}. ${profile.summary} ${profile.tagline} Contact: ${profile.email}, LinkedIn ${profile.linkedin}.`,
  },
  ...experiences.map((e) => ({
    title: `Experience — ${e.role}`,
    text: `${e.role} at ${e.company} (${e.period}, ${e.location}). ${e.bullets.join(' ')} Technologies: ${e.tags.join(', ')}.`,
  })),
  ...projects.map((p) => ({
    title: `Project — ${p.title}`,
    text: `${p.title}. ${p.blurb} ${p.bullets.join(' ')} Stack: ${p.tags.join(', ')}.`,
  })),
  ...skills.map((s) => ({
    title: `Skills — ${s.label}`,
    text: `${s.label}: ${s.items.join(', ')}.`,
  })),
  {
    title: 'Certifications',
    text: certifications.map((c) => `${c.name} (${c.issuer}, ${c.date})`).join('; ') + '.',
  },
  {
    title: 'Education',
    text: education.map((e) => `${e.degree} at ${e.school} (${e.period}, ${e.location})`).join('; ') + '.',
  },
  {
    title: 'Languages',
    text: languages.map((l) => `${l.language}: ${l.level}`).join(', ') + '.',
  },
]

/** Full grounding text injected into the LLM system prompt. */
export const knowledgeText = chunks.map((c) => `## ${c.title}\n${c.text}`).join('\n\n')

const STOP = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'was',
  'were', 'what', 'which', 'who', 'did', 'do', 'does', 'his', 'her', 'he', 'she',
  'khaled', 'about', 'tell', 'me', 'you', 'your', 'with', 'at', 'that', 'this', 'it',
])

const tokenize = (s: string): string[] =>
  s.toLowerCase().match(/[a-z0-9@.+#-]{2,}/g)?.filter((t) => !STOP.has(t)) ?? []

/**
 * Lightweight client-side retrieval used as a free, offline fallback when the
 * LLM endpoint is unavailable. Scores chunks by query-term overlap.
 */
export function retrieve(query: string): { answer: string; matched: string[] } {
  const q = tokenize(query)
  if (q.length === 0) {
    return {
      answer:
        "Ask me about Khaled's experience, projects (like Hotel Mind), skills, certifications, or education.",
      matched: [],
    }
  }

  const scored = chunks
    .map((c) => {
      const words = tokenize(c.title + ' ' + c.text)
      const set = new Set(words)
      const score = q.reduce((acc, term) => acc + (set.has(term) ? 1 : 0), 0)
      return { c, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) {
    return {
      answer:
        "I don't have that in Khaled's portfolio, but I can tell you about his experience, projects, skills, certifications, education, or languages. You can also reach him at " +
        profile.email +
        '.',
      matched: [],
    }
  }

  const top = scored.slice(0, 2)
  const answer = top.map((s) => s.c.text).join('\n\n')
  return { answer, matched: top.map((s) => s.c.title) }
}
