import CareerCardFace, { DEWA_DARK_GREEN, DEWA_GREEN, WATERMARK_STRIPES } from './CareerCardFace'

const CARD_BG = '#F4FBF3'
const INK = '#0D2E1A'

function CareerCard({ flipped, onFlip, name, avatarUrl, gender, career }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[640px] cursor-pointer select-none"
      style={{ aspectRatio: '8 / 5', perspective: 1600 }}
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label="Flip career card"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT — visual only; the actual downloaded/saved image is captured
            from a separate, non-3D-transformed instance in CardPage.jsx, since
            html2canvas can't correctly render elements inside a preserve-3d /
            backface-visibility context (see CareerCardFace.jsx for details). */}
        <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
          <CareerCardFace name={name} avatarUrl={avatarUrl} gender={gender} career={career} />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex h-full w-full flex-col gap-3 overflow-hidden p-4"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: CARD_BG,
            backgroundImage: WATERMARK_STRIPES,
            borderRadius: 22,
            border: `4px solid ${DEWA_DARK_GREEN}`,
            boxShadow: '6px 6px 0 rgba(13, 7, 36, 0.35)',
          }}
        >
          <h2 className="text-center font-display text-lg" style={{ color: DEWA_DARK_GREEN }}>
            How to become a {career.title}! 🗺️
          </h2>
          <ul className="grid flex-1 grid-cols-2 gap-2 text-xs font-semibold" style={{ color: INK }}>
            {career.tips.map((tip) => (
              <li
                key={tip}
                className="flex items-center rounded-xl border-2 p-2"
                style={{ borderColor: DEWA_GREEN, background: '#FFFFFFAA' }}
              >
                {tip}
              </li>
            ))}
          </ul>
          <p className="text-center text-[10px] font-bold" style={{ color: DEWA_DARK_GREEN }}>
            ← See my card
          </p>
        </div>
      </div>
    </div>
  )
}

export default CareerCard
