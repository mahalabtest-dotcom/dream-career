import { motion } from 'framer-motion'
import { getAvatarsForGender } from '../data/avatars'

function AvatarPicker({ gender, selectedAvatarId, onSelect }) {
  const avatars = getAvatarsForGender(gender)

  if (avatars.length === 0) {
    return (
      <p className="text-sm font-bold text-ink/60">Pick a superhero type first! 👆</p>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className="text-sm font-extrabold text-ink">Pick your avatar!</p>
      <div className="flex w-full justify-center gap-4">
        {avatars.map((avatar, index) => {
          const selected = selectedAvatarId === avatar.id
          const tilt = ((index % 3) - 1) * 4

          return (
            <motion.button
              key={avatar.id}
              type="button"
              aria-label={`Choose the ${avatar.label} avatar`}
              aria-pressed={selected}
              onClick={() => onSelect(avatar)}
              whileHover={{ scale: 1.08, rotate: 0 }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: selected ? 1.1 : 1, rotate: selected ? 0 : tilt }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`flex flex-col items-center gap-1 rounded-2xl border-4 border-ink bg-white p-2 ${
                selected ? 'shadow-sticker-glow' : 'shadow-sticker-sm'
              }`}
            >
              <span className="h-16 w-16 overflow-hidden rounded-full border-2 border-ink">
                <img src={avatar.src} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="text-xs font-extrabold text-ink">{avatar.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default AvatarPicker
