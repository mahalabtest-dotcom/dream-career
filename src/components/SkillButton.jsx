import { motion } from 'framer-motion'

const CATEGORY_STYLES = {
  social: 'bg-coral text-cream',
  creative: 'bg-sunny text-ink',
  analytical: 'bg-sky text-ink',
  sports: 'bg-mint text-ink',
  technical: 'bg-tangerine text-ink',
  science: 'bg-lilac text-ink',
}

function SkillButton({ skill, selected, onToggle, index = 0 }) {
  const tilt = ((index % 3) - 1) * 2.5
  const colors = CATEGORY_STYLES[skill.category] ?? 'bg-cream text-ink'

  return (
    <motion.button
      type="button"
      layout
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={skill.label}
      whileHover={{ scale: 1.08, rotate: 0 }}
      whileTap={{ scale: 0.92 }}
      animate={{ scale: selected ? 1.08 : 1, rotate: selected ? 0 : tilt }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={`relative flex min-h-[88px] min-w-[88px] flex-col items-center justify-center gap-1 rounded-2xl border-4 border-ink p-3 text-center ${colors} ${
        selected ? 'shadow-sticker-glow' : 'shadow-sticker-sm'
      }`}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-cream text-sm text-ink"
        >
          ⭐
        </motion.span>
      )}
      <span className="text-3xl" aria-hidden="true">
        {skill.icon}
      </span>
      <span className="text-xs font-extrabold leading-tight">{skill.label}</span>
    </motion.button>
  )
}

export default SkillButton
