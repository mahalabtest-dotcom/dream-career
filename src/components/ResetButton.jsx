import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../context/AppContext'

function ResetButton() {
  const { resetAll } = useAppContext()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  function handleConfirm() {
    resetAll()
    setConfirmOpen(false)
    navigate('/')
  }

  return (
    <>
      <button
        type="button"
        aria-label="Restart the mission"
        onClick={() => setConfirmOpen(true)}
        className="fixed right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-ink bg-cream text-lg shadow-sticker-sm"
      >
        <span aria-hidden="true">🔄</span>
      </button>

      <AnimatePresence>
        {confirmOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 px-4"
            onClick={() => setConfirmOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-w-sm flex-col items-center gap-4 rounded-3xl border-4 border-ink bg-cream p-6 text-center shadow-sticker"
              role="alertdialog"
              aria-label="Confirm restart"
            >
              <p className="font-display text-xl text-ink">Restart the mission? 🚀</p>
              <p className="text-sm font-semibold text-ink/70">
                You&apos;ll lose your current progress and start from the beginning.
              </p>
              <div className="flex w-full gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 rounded-full border-4 border-ink bg-white px-4 py-2 font-extrabold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 rounded-full border-4 border-ink bg-coral px-4 py-2 font-extrabold text-cream"
                >
                  Yes, restart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ResetButton
