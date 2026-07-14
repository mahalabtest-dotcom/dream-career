import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { useAppContext } from '../context/AppContext'
import { saveCareerCard } from '../services/supabaseService'
import CareerCard from '../components/CareerCard'
import CareerCardFace from '../components/CareerCardFace'
import Confetti from '../components/Confetti'

function CardPage() {
  const { name, gender, avatarUrl, chosenCareer } = useAppContext()
  const [flipped, setFlipped] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const captureRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!chosenCareer) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="font-display text-2xl text-cream">No career chosen yet! 🛸</p>
        <Link
          to="/welcome"
          className="rounded-full border-4 border-ink bg-sky px-6 py-3 font-extrabold text-ink shadow-sticker-sm"
        >
          ← Back to skills
        </Link>
      </div>
    )
  }

  async function captureFrontImage() {
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready
      } catch {
        // Font-loading readiness is best-effort — proceed with the capture regardless.
      }
    }

    // Transparent background so the rounded card corners stay clean in the PNG
    // (the dark card fills the rest).
    const canvas = await html2canvas(captureRef.current, { scale: 2, backgroundColor: null })
    return canvas.toDataURL('image/png')
  }

  async function handleDownload() {
    if (!captureRef.current) return

    const dataUrl = await captureFrontImage()
    const fileName = `${name || 'my'}-career-card.png`

    if (navigator.canShare && navigator.share) {
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], fileName, { type: 'image/png' })
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'My Dream Career Card' })
        return
      }
    }

    const link = document.createElement('a')
    link.download = fileName
    link.href = dataUrl
    link.click()
  }

  async function handleSave() {
    if (!captureRef.current) return

    setSaveState('saving')
    try {
      const dataUrl = await captureFrontImage()
      await saveCareerCard({ imageDataUrl: dataUrl, name, career: chosenCareer })
      setSaveState('saved')
    } catch (err) {
      // Surface the real reason in the console so save failures are diagnosable
      // (missing/placeholder env vars, RLS policy, network, etc.).
      console.error('Save to Supabase failed:', err)
      setSaveState('error')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 px-4 py-16">
      {showConfetti && <Confetti />}
      <h1 className="text-center font-display text-4xl text-cream drop-shadow-[3px_3px_0_rgba(13,7,36,0.9)] md:text-5xl">
        Your Dream Career Card! 🎉
      </h1>
      <p className="-mt-4 text-lg font-semibold text-lilac">Tap the card to flip it!</p>

      <CareerCard
        flipped={flipped}
        onFlip={() => setFlipped((prev) => !prev)}
        name={name}
        avatarUrl={avatarUrl}
        gender={gender}
        career={chosenCareer}
      />

      {/* Hidden, fixed-size, non-3D-transformed clone of the front face — this
          is what Download/Save actually capture. html2canvas can't correctly
          render the visible flip card's own front face because it sits inside
          a `preserve-3d`/`backface-visibility` context. Off-screen instead of
          display:none/opacity:0 so html2canvas still renders it fully. */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', top: 0, left: -9999, width: 680, aspectRatio: '8 / 5', pointerEvents: 'none' }}
      >
        <CareerCardFace ref={captureRef} name={name} avatarUrl={avatarUrl} gender={gender} career={chosenCareer} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Download my career card as an image"
          onClick={handleDownload}
          className="rounded-full border-4 border-ink bg-mint px-8 py-3 font-display text-xl text-ink shadow-sticker"
        >
          Download 📥
        </button>
        <button
          type="button"
          aria-label="Save my career card to the gallery"
          onClick={handleSave}
          disabled={saveState === 'saving'}
          className="rounded-full border-4 border-ink bg-sky px-8 py-3 font-display text-xl text-ink shadow-sticker disabled:opacity-60"
        >
          {saveState === 'saving' ? 'Saving...' : 'Save 💾'}
        </button>
      </div>

      {saveState === 'saved' && (
        <p className="font-bold text-mint">Saved to the mission gallery! ⭐</p>
      )}
      {saveState === 'error' && (
        <p className="font-bold text-coral">Couldn&apos;t save right now — try again later!</p>
      )}
    </div>
  )
}

export default CardPage
