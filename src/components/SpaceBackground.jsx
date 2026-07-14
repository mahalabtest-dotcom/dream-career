import { useMemo } from 'react'

const PLANETS = [
  { emoji: '🪐', size: 56, left: '6%', top: '14%', duration: 11 },
  { emoji: '🌍', size: 40, left: '88%', top: '22%', duration: 9 },
  { emoji: '🌙', size: 36, left: '80%', top: '74%', duration: 13 },
  { emoji: '☄️', size: 32, left: '10%', top: '78%', duration: 8 },
]

function SpaceBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Layered nebula gradients for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 70% -10%, rgba(179, 136, 255, 0.25), transparent 60%),
            radial-gradient(ellipse 60% 45% at 10% 100%, rgba(76, 201, 240, 0.18), transparent 55%),
            radial-gradient(ellipse 50% 40% at 95% 80%, rgba(255, 84, 112, 0.12), transparent 60%),
            linear-gradient(180deg, var(--space-900) 0%, var(--space-950) 100%)
          `,
        }}
      />

      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {PLANETS.map((planet) => (
        <span
          key={planet.emoji}
          className="absolute select-none opacity-80"
          style={{
            left: planet.left,
            top: planet.top,
            fontSize: planet.size,
            animation: `drift ${planet.duration}s ease-in-out infinite`,
          }}
        >
          {planet.emoji}
        </span>
      ))}
    </div>
  )
}

export default SpaceBackground
