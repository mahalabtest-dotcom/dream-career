import { useMemo } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#FF5470', '#FFB726', '#2EE6A8', '#4CC9F0', '#B388FF']
const EMOJI = ['🎉', '✨', '⭐', '🚀', '🪐']

function Confetti({ count = 28 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        emoji: EMOJI[i % EMOJI.length],
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.3,
        duration: 1.8 + Math.random() * 1.2,
        rotate: (Math.random() - 0.5) * 720,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-0 text-2xl"
          style={{ left: `${piece.left}%`, color: piece.color }}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: 0, rotate: piece.rotate }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeIn' }}
        >
          {piece.emoji}
        </motion.span>
      ))}
    </div>
  )
}

export default Confetti
