import { motion, useScroll, useTransform } from 'framer-motion'

function RocketScroll({ launching }) {
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 520])

  return (
    <motion.div
      className="pointer-events-none fixed right-4 top-28 z-40 md:right-10"
      style={{ y: parallaxY }}
      aria-hidden="true"
    >
      <motion.span
        className="block text-4xl md:text-5xl"
        animate={
          launching
            ? { y: -1400, rotate: -15, opacity: 0 }
            : { y: [0, 14, 0] }
        }
        transition={
          launching
            ? { duration: 0.9, ease: 'easeIn' }
            : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        🚀
      </motion.span>
    </motion.div>
  )
}

export default RocketScroll
