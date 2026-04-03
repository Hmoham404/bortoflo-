import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-[#0A0A0F] font-bold shadow-lg hover:scale-110 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
            boxShadow: '0 0 20px rgba(0,245,255,0.4)',
          }}
          aria-label="Retour en haut"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Loading screen
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: '#0A0A0F' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-[#0A0A0F] font-bold font-mono text-2xl"
          style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)' }}
        >
          ML
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(90deg, #00F5FF, #7C3AED)' }}
          />
        </div>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-mono text-xs text-gray-500 tracking-widest"
        >
          INITIALISATION...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-[#0A0A0F]">
      {/* Background effects (fixed, behind everything) */}
      <div className="ascii-grid" />
      <div className="scan-lines" />
      <div className="scan-line-moving" />
      <div className="orb-cyan" />
      <div className="orb-violet" />

      {/* Loading */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {/* UI */}
      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  )
}
