import dewaLogo from '../assets/dewa-logo.png'
import CareerCardFace, { DEWA_DARK_GREEN, DEWA_GREEN, GUILLOCHE } from './CareerCardFace'

const CARD_BG = '#F3FAF2'
const INK = '#0D2E1A'

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
          className="absolute inset-0 flex h-full w-full flex-col overflow-hidden p-5"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: CARD_BG,
            backgroundImage: GUILLOCHE,
            borderRadius: 20,
            border: `4px solid ${DEWA_DARK_GREEN}`,
            boxShadow: '6px 6px 0 rgba(13, 7, 36, 0.35)',
          }}
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <img
              src={dewaLogo}
              alt=""
              className="h-7 w-auto rounded bg-white p-1"
            />
            <h2 className="font-display text-lg md:text-xl" style={{ color: DEWA_DARK_GREEN }}>
              How to become a {career.title}!
            </h2>
          </div>
          <ul className="grid flex-1 grid-cols-2 gap-3 text-sm font-semibold" style={{ color: INK }}>
            {career.tips.map((tip, index) => (
              <li
                key={tip}
                className="flex items-center gap-2 rounded-xl p-3"
                style={{
                  border: `2px solid ${DEWA_GREEN}`,
                  background: '#FFFFFFCC',
                }}
              >
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
                  style={{ background: DEWA_GREEN }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="leading-snug">{tip}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-center text-xs font-bold" style={{ color: DEWA_DARK_GREEN }}>
            ← Tap to see your card
          </p>
        </div>
      </div>
    </div>
  )
}

export default CareerCard
