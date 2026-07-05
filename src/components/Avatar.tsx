import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Bot } from 'lucide-react'
import { profile } from '../data/content'

export default function Avatar() {
  const reduce = useReducedMotion()
  const float = reduce ? {} : { y: [0, -10, 0] }

  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[380px]"
      animate={float}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* soft gradient backdrop */}
      <div
        className="absolute inset-4 rounded-[2.4rem] blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, #7c93ff 0%, #3b5bdb 45%, #2c3e63 80%)',
          opacity: 0.28,
        }}
      />
      <div className="absolute -inset-2 rounded-[2.6rem] bg-gradient-to-br from-accent/15 to-navy/10" />

      {/* framed image */}
      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/60 bg-white shadow-2xl shadow-navy/15 ring-1 ring-line">
        <img
          src={profile.avatar}
          alt={`${profile.name} — developer`}
          className="h-full w-full object-cover"
          loading="eager"
          width={380}
          height={380}
        />
      </div>

      {/* floating chips */}
      <motion.div
        className="absolute -left-4 top-8 flex items-center gap-2 rounded-xl border border-line bg-white/90 px-3 py-2 shadow-lg shadow-navy/10 backdrop-blur"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-accent">
          <Bot size={16} />
        </span>
        <span className="text-xs font-semibold text-navy">AI Engineer</span>
      </motion.div>

      <motion.div
        className="absolute -right-3 bottom-10 flex items-center gap-2 rounded-xl border border-line bg-white/90 px-3 py-2 shadow-lg shadow-navy/10 backdrop-blur"
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-navy/5 text-navy">
          <Sparkles size={16} />
        </span>
        <span className="text-xs font-semibold text-navy">RAG · LLMs</span>
      </motion.div>
    </motion.div>
  )
}
