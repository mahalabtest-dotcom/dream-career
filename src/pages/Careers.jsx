import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import { SKILLS } from '../data/skills'
import { getCareerRecommendations } from '../services/claudeService'
import { getFallbackCareers } from '../data/fallbackCareers'
import Confetti from '../components/Confetti'

const CAREER_EMOJI = ['🛸', '🌟', '🔭']

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <div className="relative h-28 w-28">
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-4xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <span className="-translate-y-12 block">🚀</span>
        </motion.span>
        <span className="absolute inset-0 flex items-center justify-center text-5xl" aria-hidden="true">
          🧠
        </span>
      </div>
      <p className="font-display text-2xl text-cream drop-shadow-[2px_2px_0_rgba(13,7,36,0.9)]">
        Our AI is thinking about YOUR future...
      </p>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="text-lg font-bold text-mint"
      >
        Scanning the galaxy of careers ✨
      </motion.p>
    </div>
  )
}

function MatchBar({ percent }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded-full border-2 border-ink bg-white">
      <motion.div
        className="h-full rounded-full bg-mint"
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  )
}

function Careers() {
  const navigate = useNavigate()
  const { selectedSkills, setChosenCareer } = useAppContext()
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (!showConfetti) return
    const timer = setTimeout(() => setShowConfetti(false), 2500)
    return () => clearTimeout(timer)
  }, [showConfetti])

  const loadCareers = useCallback(async () => {
    setLoading(true)
    setUsingFallback(false)
    setSelectedIndex(null)

    const skillLabels = selectedSkills
      .map((id) => SKILLS.find((skill) => skill.id === id)?.label)
      .filter(Boolean)

    try {
      const result = await getCareerRecommendations(skillLabels)
      setCareers(result)
    } catch (err) {
      // Surface why the AI call fell back (missing key, CORS, timeout, parse
      // error) so it's diagnosable in the browser console.
      console.error('Claude career recommendation failed, using fallback:', err)
      setCareers(getFallbackCareers(selectedSkills, SKILLS))
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }, [selectedSkills])

  useEffect(() => {
    loadCareers()
  }, [loadCareers])

  function handleSelect(index) {
    setSelectedIndex(index)
    setShowConfetti(true)
  }

  function handleContinue() {
    if (selectedIndex === null) return
    setChosenCareer(careers[selectedIndex])
    navigate('/card')
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen px-4 py-16">
      {showConfetti && <Confetti />}
      <h1 className="mb-3 text-center font-display text-4xl text-cream drop-shadow-[3px_3px_0_rgba(13,7,36,0.9)] md:text-5xl">
        Mission Report: <span className="text-sunny">Your Future!</span> 🎉
      </h1>
      <p className="mb-10 text-center text-lg font-semibold text-lilac">
        Tap the one that makes your heart go zoom!
      </p>
      {usingFallback && (
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-bold text-coral">
            Oops! Our AI is taking a space nap — here are some stellar picks for you! 💤
          </p>
          <button
            type="button"
            onClick={loadCareers}
            className="rounded-full border-4 border-ink bg-sky px-5 py-2 text-sm font-extrabold text-ink shadow-sticker-sm"
          >
            Wake the AI up! 🔄
          </button>
        </div>
      )}

      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-stretch">
        {careers.map((career, index) => (
          <motion.button
            key={career.title}
            type="button"
            aria-label={`Select ${career.title} career`}
            aria-pressed={selectedIndex === index}
            onClick={() => handleSelect(index)}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: selectedIndex === index ? 0 : ((index % 3) - 1) * 1.5,
            }}
            transition={{ delay: index * 0.18, type: 'spring', stiffness: 200, damping: 18 }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            className={`flex flex-1 flex-col gap-3 rounded-[1.75rem] border-4 border-ink bg-cream p-6 text-left text-ink ${
              selectedIndex === index ? 'shadow-sticker-glow' : 'shadow-sticker'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl" aria-hidden="true">
                {CAREER_EMOJI[index % CAREER_EMOJI.length]}
              </span>
              {selectedIndex === index && (
                <motion.span
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="rounded-full border-2 border-ink bg-mint px-3 py-1 text-xs font-extrabold text-ink"
                >
                  ⭐ Picked!
                </motion.span>
              )}
            </div>
            <h2 className="font-display text-2xl">{career.title}</h2>
            <p className="inline-block w-fit rounded-full bg-sky/30 px-3 py-1 text-sm font-extrabold">
              📍 {career.workplace}, UAE
            </p>
            <MatchBar percent={career.matchPercent} />
            <p className="font-display text-lg text-coral">{career.matchPercent}% match!</p>
            <p className="text-sm font-semibold leading-snug">{career.message}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="mt-12 flex justify-center"
          >
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-full border-4 border-ink bg-sunny px-10 py-4 font-display text-2xl text-ink shadow-sticker"
            >
              This is my future! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Careers
