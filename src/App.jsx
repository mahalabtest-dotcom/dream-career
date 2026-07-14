import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import Landing from './pages/Landing'
import Welcome from './pages/Welcome'
import Careers from './pages/Careers'
import CardPage from './pages/CardPage'
import ProgressBar from './components/ProgressBar'
import PageTransition from './components/PageTransition'
import SpaceBackground from './components/SpaceBackground'
import BackButton from './components/BackButton'
import ResetButton from './components/ResetButton'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Landing />
            </PageTransition>
          }
        />
        <Route
          path="/welcome"
          element={
            <PageTransition>
              <Welcome />
            </PageTransition>
          }
        />
        <Route
          path="/careers"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        <Route
          path="/card"
          element={
            <PageTransition>
              <CardPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <SpaceBackground />
        <BackButton />
        <ProgressBar />
        <ResetButton />
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
