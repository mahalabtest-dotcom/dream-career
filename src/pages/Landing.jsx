import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import AvatarPicker from '../components/AvatarPicker'

const popIn = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, type: 'spring', stiffness: 260, damping: 18 },
  }),
}

function Landing() {
  const navigate = useNavigate()
  const { name, setName, gender, setGender, avatarId, setAvatarId, setAvatarUrl } =
    useAppContext()

  const isValid = name.trim().length >= 2 && gender !== '' && avatarId !== ''

  function handleGenderSelect(nextGender) {
    if (nextGender !== gender) {
      setAvatarId('')
      setAvatarUrl('')
    }
    setGender(nextGender)
  }

  function handleAvatarSelect(avatar) {
    setAvatarId(avatar.id)
    setAvatarUrl(avatar.src)
  }

  function handleNext() {
    if (!isValid) return
    navigate('/welcome')
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <motion.h1
          variants={popIn}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center font-display text-4xl text-cream drop-shadow-[3px_3px_0_rgba(13,7,36,0.9)] md:text-5xl"
        >
          What Will{' '}
          <span className="text-sunny">You</span> Be?{' '}
          <motion.span
            className="inline-block"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            🚀
          </motion.span>
        </motion.h1>

        <motion.p
          variants={popIn}
          initial="hidden"
          animate="show"
          custom={0.12}
          className="text-center text-lg font-semibold text-lilac"
        >
          Your space mission to the future starts here!
        </motion.p>

        <motion.div
          variants={popIn}
          initial="hidden"
          animate="show"
          custom={0.24}
          className="flex w-full flex-col items-center gap-6 rounded-[2rem] border-4 border-ink bg-cream p-8 shadow-sticker"
          style={{ rotate: '-1deg' }}
        >
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name here ✨"
            aria-label="Your name"
            className="w-full rounded-full border-4 border-ink bg-white px-6 py-3 text-center text-lg font-bold text-ink outline-none transition placeholder:text-ink/40 focus:border-mint"
          />

          <div className="flex w-full gap-4">
            <button
              type="button"
              aria-label="Select Girl"
              aria-pressed={gender === 'girl'}
              onClick={() => handleGenderSelect('girl')}
              className={`flex min-h-[96px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl border-4 border-ink text-lg font-extrabold text-ink transition ${
                gender === 'girl'
                  ? 'bg-coral text-cream shadow-sticker-sm -rotate-2'
                  : 'bg-white'
              }`}
            >
              <span className="text-3xl" aria-hidden="true">
                👸
              </span>
              Girl
            </button>
            <button
              type="button"
              aria-label="Select Boy"
              aria-pressed={gender === 'boy'}
              onClick={() => handleGenderSelect('boy')}
              className={`flex min-h-[96px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl border-4 border-ink text-lg font-extrabold text-ink transition ${
                gender === 'boy'
                  ? 'bg-sky text-ink shadow-sticker-sm rotate-2'
                  : 'bg-white'
              }`}
            >
              <span className="text-3xl" aria-hidden="true">
                🏆
              </span>
              Boy
            </button>
          </div>

          <AnimatePresence mode="wait">
            {gender && (
              <motion.div
                key={gender}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="w-full"
              >
                <AvatarPicker
                  gender={gender}
                  selectedAvatarId={avatarId}
                  onSelect={handleAvatarSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isValid && (
              <motion.button
                type="button"
                onClick={handleNext}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                className="w-full rounded-full border-4 border-ink bg-mint px-6 py-3 font-display text-xl text-ink shadow-sticker"
              >
                Blast Off! 🚀
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Landing
