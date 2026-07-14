import { useLocation, useNavigate } from 'react-router-dom'

const BACK_MAP = {
  '/welcome': '/',
  '/careers': '/welcome',
  '/card': '/careers',
}

function BackButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const backTo = BACK_MAP[pathname]

  if (!backTo) return null

  return (
    <button
      type="button"
      aria-label="Go back to the previous step"
      onClick={() => navigate(backTo)}
      className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-lg font-extrabold text-ink shadow-sticker-sm"
    >
      ←
    </button>
  )
}

export default BackButton
