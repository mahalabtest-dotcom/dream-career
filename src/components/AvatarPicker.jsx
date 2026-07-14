import { motion } from 'framer-motion'
import { getAvatarsForGender } from '../data/avatars'

// Character art is a full-body portrait with the face in the upper third —
// bias the crop upward so round/square frames show the face, not the torso.
const FACE_CROP = { objectPosition: '50% 12%' }

function AvatarPicker({ gender, selectedAvatarId, onSelect }) {
  const avatars = getAvatarsForGender(gender)

  if (avatars.length === 0) {
    return <p className="text-sm font-bold text-ink/60">Pick a superhero type first! 👆</p>
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
              aria-label={`Choose ${avatar.label}`}
              aria-pressed={selected}
              onClick={() => onSelect(avatar)}
              whileHover={{ scale: 1.08, rotate: 0 }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: selected ? 1.1 : 1, rotate: selected ? 0 : tilt }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className={`rounded-full border-4 border-ink bg-white ${
                selected ? 'shadow-sticker-glow' : 'shadow-sticker-sm'
              }`}
            >
              <span className="block h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
                <img
                  src={avatar.src}
                  alt=""
                  className="h-full w-full object-cover"
                  style={FACE_CROP}
                />
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default AvatarPicker
