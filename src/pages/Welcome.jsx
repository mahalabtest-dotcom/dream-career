import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { SKILLS } from '../data/skills'
import SkillButton from '../components/SkillButton'
import RocketScroll from '../components/RocketScroll'

const MIN_SKILLS = 3

function Welcome() {
  const navigate = useNavigate()
  const { name, gender, avatarUrl, selectedSkills, setSelectedSkills } = useAppContext()
  const [launching, setLaunching] = useState(false)

  const greeting =
    gender === 'girl' ? `Hi Princess ${name}! 👑` : `Hi Champion ${name}! 🏆`

  function toggleSkill(id) {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id],
    )
  }

  function handleFindCareer() {
    if (selectedSkills.length < MIN_SKILLS) return
    setLaunching(true)
    setTimeout(() => navigate('/careers'), 900)
  }

  return (
    <div className="relative">
      <RocketScroll launching={launching} />

      <section className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
        {avatarUrl && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="h-44 w-44 overflow-hidden rounded-full border-4 border-cream bg-white shadow-[0_0_40px_rgba(179,136,255,0.7)]"
          >
            <img src={avatarUrl} alt={`${name}'s avatar`} className="h-full w-full object-cover" />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-4xl text-cream drop-shadow-[3px_3px_0_rgba(13,7,36,0.9)] md:text-5xl"
        >
          {greeting}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-md text-lg font-semibold text-lilac"
        >
          Let&apos;s discover what you&apos;ll be when you grow up!
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 0.6, y: { duration: 1.4, repeat: Infinity } }}
          className="mt-4 text-2xl"
          aria-hidden="true"
        >
          ⬇️
        </motion.span>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 text-center">
        <h2 className="mb-2 font-display text-3xl text-sunny drop-shadow-[2px_2px_0_rgba(13,7,36,0.9)] md:text-4xl">
          Pick your superpowers! ⚡
        </h2>
        <p className="mb-8 text-base font-semibold text-cream/80">
          What do you love doing? Choose at least {MIN_SKILLS}!
        </p>

        <div className="grid grid-cols-3 place-items-center gap-4 sm:grid-cols-4 md:grid-cols-6">
          {SKILLS.map((skill, index) => (
            <SkillButton
              key={skill.id}
              skill={skill}
              index={index}
              selected={selectedSkills.includes(skill.id)}
              onToggle={() => toggleSkill(skill.id)}
            />
          ))}
        </div>

        <p className="mt-8 inline-block rounded-full border-4 border-ink bg-cream px-6 py-2 text-lg font-extrabold text-ink shadow-sticker-sm">
          You picked {selectedSkills.length} superpower{selectedSkills.length === 1 ? '' : 's'}!
        </p>

        <AnimatePresence>
          {selectedSkills.length >= MIN_SKILLS && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <motion.button
                type="button"
                onClick={handleFindCareer}
                animate={{ rotate: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="mt-8 rounded-full border-4 border-ink bg-coral px-10 py-4 font-display text-2xl text-cream shadow-sticker"
              >
                Find My Career! 🔍
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Welcome
