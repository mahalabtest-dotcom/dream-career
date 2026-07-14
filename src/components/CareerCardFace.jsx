import { forwardRef, useMemo } from 'react'
import dewaLogo from '../assets/dewa-logo.png'
import uaeFlag from '../assets/uae-flag.png'

// Premium "aurora" palette (shared with the card back). Deliberately NOT the
// DEWA-green theme — a dark navy panel with a cyan→violet→magenta glow border.
export const CARD = {
  border: 'linear-gradient(120deg, #00B7FF 0%, #8B5CF6 50%, #FF30FF 100%)',
  panel: 'linear-gradient(155deg, #12294D 0%, #0A1730 55%, #070F24 100%)',
  white: '#F8FAFC',
  muted: '#93A5C4',
  accent: '#38E0FF',
  eyebrow: '#7FB6FF',
  radius: 22,
}

// Faint corner "glow blooms" for depth — radial-gradients render fine in
// html2canvas (conic-gradient does not, so it's used only in the live-only
// animated halo in CareerCard.jsx, never in this captured face).
const BLOOMS =
  'radial-gradient(60% 55% at 12% 0%, rgba(0,183,255,0.20), transparent 70%), radial-gradient(55% 60% at 100% 100%, rgba(255,48,255,0.16), transparent 70%)'

const FACE_CROP = { objectFit: 'cover', objectPosition: '50% 14%' }

function generateCareerId(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  const digits = String(hash).padStart(8, '0').slice(-8)
  return `784-${digits.slice(0, 4)}-${digits.slice(4)}`
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${date.getFullYear()}`
}

const CareerCardFace = forwardRef(function CareerCardFace({ name, avatarUrl, gender, career }, ref) {
  const careerId = useMemo(() => generateCareerId(`${name}-${career.title}`), [name, career.title])
  const issuedOn = useMemo(() => formatDate(new Date()), [])

  return (
    // Outer = the glowing gradient border (created by 3px padding over a gradient)
    <div
      ref={ref}
      style={{
        height: '100%',
        width: '100%',
        padding: 3,
        borderRadius: CARD.radius,
        background: CARD.border,
        boxShadow: '0 18px 40px rgba(4, 10, 30, 0.55)',
      }}
    >
      {/* Inner dark panel */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          borderRadius: CARD.radius - 3,
          background: CARD.panel,
          backgroundImage: `${BLOOMS}, ${CARD.panel}`,
          display: 'flex',
          gap: 26,
          padding: 26,
          color: CARD.white,
        }}
      >
        {/* Left: avatar (vertically centered) with gradient ring + glow, and a tag */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: 4,
              borderRadius: 20,
              background: CARD.border,
              boxShadow: '0 0 26px rgba(0,183,255,0.4)',
            }}
          >
            <div style={{ height: 218, width: 168, overflow: 'hidden', borderRadius: 16, background: '#0A1730' }}>
              <img src={avatarUrl} alt={`${name}'s avatar`} style={{ height: '100%', width: '100%', ...FACE_CROP }} />
            </div>
          </div>
          <span
            style={{
              borderRadius: 999,
              padding: '5px 20px',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#04101F',
              background: CARD.accent,
            }}
          >
            EXPLORER
          </span>
        </div>

        {/* Right: details in three zones — logos (top), main (centered), meta (bottom) */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', minWidth: 0, height: '100%' }}>
          {/* Top row: eyebrow + flag + DEWA chip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 3.5, color: CARD.eyebrow }}>
              DREAM CAREER ID
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={uaeFlag} alt="UAE" style={{ height: 28, width: 42, borderRadius: 4, objectFit: 'cover' }} />
              <span style={{ display: 'inline-flex', background: '#fff', borderRadius: 9, padding: '5px 8px' }}>
                <img src={dewaLogo} alt="DEWA" style={{ height: 28, width: 'auto' }} />
              </span>
            </div>
          </div>

          {/* Middle: name / career / designation / workplace / message — centered */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <p
              style={{
                fontFamily: '"Lilita One", sans-serif',
                fontSize: 48,
                lineHeight: 1.02,
                color: CARD.white,
                letterSpacing: 0.5,
              }}
            >
              {name}
            </p>

            <p
              style={{
                fontFamily: '"Lilita One", sans-serif',
                fontSize: 30,
                lineHeight: 1.1,
                marginTop: 4,
                color: CARD.accent,
              }}
            >
              {career.title}
            </p>

            <p style={{ fontSize: 15, fontWeight: 600, color: CARD.muted, marginTop: 12, lineHeight: 1.4 }}>
              {career.designation}
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, color: CARD.white, marginTop: 3, lineHeight: 1.4 }}>
              <span style={{ color: CARD.accent }}>◈</span> {career.workplace}, UAE
            </p>

            <div
              style={{
                height: 2,
                marginTop: 16,
                marginBottom: 14,
                borderRadius: 2,
                background: 'linear-gradient(90deg, transparent, #00B7FF, #FF30FF, transparent)',
              }}
            />

            <p style={{ fontSize: 15, fontStyle: 'italic', color: '#C7D3E8', lineHeight: 1.5 }}>
              {career.message}
            </p>
          </div>

          {/* Bottom meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: CARD.muted }}>
              CAREER No. {careerId}
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: CARD.muted }}>
              ISSUED {issuedOn}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default CareerCardFace
