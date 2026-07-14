import { forwardRef, useMemo } from 'react'
import dewaLogo from '../assets/dewa-logo.png'
import uaeFlag from '../assets/uae-flag.png'

// DEWA brand colors
export const DEWA_GREEN = '#34B233'
export const DEWA_DARK_GREEN = '#008542'
const INK = '#0D2E1A'
const CARD_BG = '#F3FAF2'

// This face is rendered twice: once inside the interactive flip card, and once
// off-screen (no 3D transform ancestors) purely for html2canvas to capture —
// html2canvas cannot correctly render elements inside a `transform-style:
// preserve-3d` / `backface-visibility: hidden` context, which caused ghosted
// text and a broken avatar image in captured downloads. This component itself
// never sets those properties.
//
// html2canvas-safety rules applied throughout:
//   - explicit hex/rgba colors only (Tailwind v4's oklch()/color-mix() break it)
//   - generous line-height + NO overflow:hidden on text (baseline clipping bug)
//   - fonts awaited (document.fonts.ready) before capture in CardPage.jsx
//   - all images are bundled same-origin assets

// Faint green "security paper" crosshatch — evokes an ID's guilloche pattern.
export const GUILLOCHE = `repeating-linear-gradient(22deg, rgba(0,133,66,0.05) 0 1px, transparent 1px 9px), repeating-linear-gradient(-22deg, rgba(0,133,66,0.05) 0 1px, transparent 1px 9px)`

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

function Field({ label, value, valueColor = INK, big = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.35, minHeight: big ? 26 : 22 }}>
      <span
        style={{
          color: DEWA_DARK_GREEN,
          fontSize: 9.5,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          width: 78,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ color: valueColor, fontSize: big ? 17 : 13.5, fontWeight: 700 }}>{value}</span>
    </div>
  )
}

const CareerCardFace = forwardRef(function CareerCardFace({ name, avatarUrl, gender, career }, ref) {
  const careerId = useMemo(() => generateCareerId(`${name}-${career.title}`), [name, career.title])
  const issuedOn = useMemo(() => formatDate(new Date()), [])
  const sexLabel = gender === 'girl' ? 'Female' : 'Male'

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background: CARD_BG,
        backgroundImage: GUILLOCHE,
        borderRadius: 20,
        border: `4px solid ${DEWA_DARK_GREEN}`,
        boxShadow: '6px 6px 0 rgba(13, 7, 36, 0.35)',
      }}
    >
      {/* Header band */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: `linear-gradient(90deg, ${DEWA_DARK_GREEN} 0%, ${DEWA_GREEN} 100%)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={dewaLogo}
            alt="DEWA logo"
            style={{ height: 46, width: 'auto', background: '#fff', borderRadius: 8, padding: 4 }}
          />
          <div style={{ lineHeight: 1.15 }}>
            <p style={{ fontFamily: '"Lilita One", sans-serif', fontSize: 22, color: '#FFF6E9', letterSpacing: 0.5 }}>
              DREAM CAREER ID
            </p>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#EAFBEA' }}>
              Youth Committee · Dubai, United Arab Emirates
            </p>
          </div>
        </div>
        <img
          src={uaeFlag}
          alt="UAE flag"
          style={{ height: 34, width: 51, borderRadius: 4, border: '2px solid #FFFFFF', objectFit: 'cover' }}
        />
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, gap: 14, padding: 16 }}>
        {/* Left: portrait photo + badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div
            style={{
              height: 140,
              width: 116,
              overflow: 'hidden',
              background: '#fff',
              border: `3px solid ${DEWA_DARK_GREEN}`,
              borderRadius: 12,
            }}
          >
            <img src={avatarUrl} alt={`${name}'s avatar`} style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: '50% 15%' }} />
          </div>
          <span
            style={{
              borderRadius: 999,
              padding: '2px 12px',
              fontSize: 10,
              fontWeight: 800,
              background: DEWA_GREEN,
              color: '#FFF6E9',
            }}
          >
            EXPLORER
          </span>
        </div>

        {/* Center: fields */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
          <Field label="Career No." value={careerId} valueColor={DEWA_DARK_GREEN} big />
          <Field label="Name" value={name} />
          <Field label="Future Career" value={career.title} />
          <Field label="Designation" value={career.designation} />
          <Field label="Workplace" value={`${career.workplace}, UAE`} />
          <div style={{ display: 'flex', gap: 24 }}>
            <Field label="Issued" value={issuedOn} />
            <Field label="Sex" value={sexLabel} />
          </div>
          <Field label="Expires" value="Never — dream big!" valueColor={DEWA_GREEN} />
        </div>

        {/* Right: official "verified" seal to fill space like an ID hologram */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 78 }}>
          <div
            style={{
              height: 76,
              width: 76,
              borderRadius: 999,
              border: `3px dashed ${DEWA_GREEN}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(52,178,51,0.08)',
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: 26 }}>⭐</span>
            <span style={{ fontSize: 7.5, fontWeight: 800, color: DEWA_DARK_GREEN, letterSpacing: 0.3 }}>FUTURE</span>
            <span style={{ fontSize: 7.5, fontWeight: 800, color: DEWA_DARK_GREEN, letterSpacing: 0.3 }}>STAR</span>
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div
        style={{
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 600,
          fontStyle: 'italic',
          color: DEWA_DARK_GREEN,
          borderTop: '2px solid rgba(52,178,51,0.3)',
          lineHeight: 1.4,
        }}
      >
        {career.message}
      </div>
    </div>
  )
})

export default CareerCardFace
