import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const STEPS = [
  { path: '/', emoji: '📸' },
  { path: '/welcome', emoji: '⚡' },
  { path: '/careers', emoji: '🛸' },
  { path: '/card', emoji: '🏆' },
]

function ProgressBar() {
  const { pathname } = useLocation()
  const currentIndex = Math.max(0, STEPS.findIndex((step) => step.path === pathname))

  return (
    <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2">
      <div
        className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-cream px-4 py-1.5 shadow-sticker-sm"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={currentIndex + 1}
        aria-label={`Mission progress: step ${currentIndex + 1} of ${STEPS.length}`}
      >
        {STEPS.map((step, index) => (
          <div key={step.path} className="flex items-center gap-2">
            <motion.span
              animate={
                index === currentIndex
                  ? { scale: [1, 1.25, 1] }
                  : { scale: 1 }
              }
              transition={index === currentIndex ? { duration: 1.2, repeat: Infinity } : {}}
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink text-base ${
                index < currentIndex
                  ? 'bg-mint'
                  : index === currentIndex
                    ? 'bg-sunny'
                    : 'bg-white opacity-50'
              }`}
              aria-hidden="true"
            >
              {index < currentIndex ? '✓' : step.emoji}
            </motion.span>
            {index < STEPS.length - 1 && (
              <span
                className={`h-1.5 w-5 rounded-full ${index < currentIndex ? 'bg-mint' : 'bg-ink/20'}`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
