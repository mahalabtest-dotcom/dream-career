import { forwardRef, useMemo } from 'react'
import dewaLogo from '../assets/dewa-logo.png'

// DEWA brand colors
export const DEWA_GREEN = '#34B233'
export const DEWA_DARK_GREEN = '#008542'
const INK = '#0D2E1A'
const CARD_BG = '#F4FBF3'

// This face is rendered twice: once inside the interactive flip card, and once
// off-screen (no 3D transform ancestors) purely for html2canvas to capture —
// html2canvas cannot correctly render elements inside a `transform-style:
// preserve-3d` / `backface-visibility: hidden` context, which caused ghosted
// text and a broken avatar image in captured downloads. This component itself
// never sets those properties; only the flip-card wrapper in CareerCard.jsx
// does, and the capture instance in CardPage.jsx has no such ancestor.
// Everything here also uses explicit hex/rgba (not Tailwind color utilities,
// which Tailwind v4 compiles to oklch()/color-mix() that html2canvas can't
// parse either).
export const WATERMARK_STRIPES = `repeating-linear-gradient(135deg, rgba(52,178,51,0.06) 0px, rgba(52,178,51,0.06) 14px, transparent 14px, transparent 28px)`

function generateCareerId(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  const digits = String(hash).padStart(8, '0').slice(-8)
  return `DC-${digits.slice(0, 4)}-${digits.slice(4)}`
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${date.getFullYear()}`
}

function FieldRow({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wide"
        style={{ color: DEWA_DARK_GREEN }}
      >
        {label}
      </span>
      <span className="flex-1 truncate text-xs font-bold" style={{ color: INK }}>
        {value}
      </span>
    </div>
  )
}

const CareerCardFace = forwardRef(function CareerCardFace({ name, avatarUrl, gender, career }, ref) {
  const careerId = useMemo(() => generateCareerId(`${name}-${career.title}`), [name, career.title])
  const issuedOn = useMemo(() => formatDate(new Date()), [])
  const sexLabel = gender === 'girl' ? 'F' : 'M'

  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col overflow-hidden"
      style={{
        background: CARD_BG,
        backgroundImage: WATERMARK_STRIPES,
        borderRadius: 22,
        border: `4px solid ${DEWA_DARK_GREEN}`,
        boxShadow: '6px 6px 0 rgba(13, 7, 36, 0.35)',
      }}
    >
      {/* Header band */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: `linear-gradient(90deg, ${DEWA_DARK_GREEN} 0%, ${DEWA_GREEN} 100%)` }}
      >
        <div className="flex items-center gap-2">
          <img
            src={dewaLogo}
            alt="DEWA logo"
            className="h-8 w-auto"
            style={{ background: '#fff', borderRadius: 6, padding: 2 }}
          />
          <div className="leading-tight">
            <p className="font-display text-sm" style={{ color: '#FFF6E9' }}>
              DREAM CAREER ID
            </p>
            <p className="text-[9px] font-bold" style={{ color: '#EAFBEA' }}>
              Youth Committee · Dubai, UAE
            </p>
          </div>
        </div>
        <span className="text-xl" aria-hidden="true">
          🌟
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 gap-3 p-4">
        {/* Photo box */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="h-24 w-20 overflow-hidden bg-white"
            style={{ border: `3px solid ${DEWA_DARK_GREEN}`, borderRadius: 10 }}
          >
            <img src={avatarUrl} alt={`${name}'s avatar`} className="h-full w-full object-cover" />
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-extrabold"
            style={{ background: DEWA_GREEN, color: '#FFF6E9' }}
          >
            {sexLabel === 'F' ? 'Explorer ♀' : 'Explorer ♂'}
          </span>
        </div>

        {/* Field rows */}
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <FieldRow label="Career ID" value={careerId} />
          <FieldRow label="Name" value={name} />
          <FieldRow label="Future Career" value={career.title} />
          <FieldRow label="Designation" value={career.designation} />
          <FieldRow label="Workplace" value={`${career.workplace}, UAE`} />
          <div className="flex gap-4">
            <FieldRow label="Issued" value={issuedOn} />
            <FieldRow label="Expires" value="Never ✨" />
          </div>
        </div>
      </div>

      {/* Footer message */}
      <div
        className="px-4 py-2 text-center text-[10px] font-semibold italic"
        style={{ color: DEWA_DARK_GREEN, borderTop: '2px solid rgba(52,178,51,0.35)' }}
      >
        {career.message}
      </div>
    </div>
  )
})

export default CareerCardFace
