import CareerCardFace, { CARD } from './CareerCardFace'

function CareerCard({ flipped, onFlip, name, avatarUrl, gender, career }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[680px] cursor-pointer select-none"
      style={{ aspectRatio: '8 / 5', perspective: 1600 }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label="Flip career card"
    >
      {/* Animated glow halo — live view only; NOT part of the captured face,
          so it never appears in the downloaded/saved image. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 -z-10"
        style={{
          borderRadius: 40,
          filter: 'blur(34px)',
          opacity: 0.6,
          background: 'conic-gradient(from 0deg, #00B7FF, #8B5CF6, #FF30FF, #00B7FF)',
          animation: 'card-halo-spin 7s linear infinite',
        }}
      />

      <div
        className="relative h-full w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT — visual only; the downloaded/saved image is captured from a
            separate, non-3D-transformed instance in CardPage.jsx. */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <CareerCardFace name={name} avatarUrl={avatarUrl} gender={gender} career={career} />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            padding: 3,
            borderRadius: CARD.radius,
            background: CARD.border,
            boxShadow: '0 18px 40px rgba(4, 10, 30, 0.55)',
          }}
        >
          <div
            className="flex h-full w-full flex-col overflow-hidden p-6"
            style={{ borderRadius: CARD.radius - 3, background: CARD.panel, color: CARD.white }}
          >
            <p
              className="text-center"
              style={{ fontFamily: '"Lilita One", sans-serif', fontSize: 20, color: CARD.accent }}
            >
              How to become a {career.title}
            </p>
            <p className="mb-4 text-center text-xs font-semibold" style={{ color: CARD.eyebrow, letterSpacing: 2 }}>
              YOUR ROADMAP TO THE FUTURE
            </p>
            <ul className="grid flex-1 grid-cols-2 gap-3">
              {career.tips.map((tip, index) => (
                <li
                  key={tip}
                  className="flex items-center gap-3 rounded-2xl p-3"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(56,224,255,0.28)',
                  }}
                >
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold"
                    style={{ background: CARD.border, color: '#04101F' }}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold leading-snug" style={{ color: '#DCE6F7' }}>
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs font-bold" style={{ color: CARD.muted }}>
              ← Tap to see your card
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerCard
