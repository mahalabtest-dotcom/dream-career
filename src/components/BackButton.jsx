import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const BACK_MAP = {
  '/welcome': '/',
  '/careers': '/welcome',
  '/card': '/careers',
}

function BackButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const backTo = BACK_MAP[pathname]

  if (!backTo) return null

  return (
    <motion.button
      type="button"
      aria-label="Go back to the previous step"
      onClick={() => navigate(backTo)}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed left-4 top-4 z-50 flex items-center gap-1.5 rounded-full border-4 border-ink bg-cream px-4 py-2 font-display text-base text-ink shadow-sticker-sm sm:px-5 sm:text-lg"
    >
      <span aria-hidden="true">←</span>
      <span>Back</span>
    </motion.button>
  )
}

export default BackButton
