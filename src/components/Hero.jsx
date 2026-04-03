import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const TYPED_STRINGS = [
  'Embedded Systems Engineer',
  'Full-Stack Developer',
  'AI Solutions Builder',
  'Formateur Certifié IA',
]

function TypedText() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = TYPED_STRINGS[textIndex]
    let timeout

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(i => i + 1)
      }, 80)
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(i => i - 1)
      }, 40)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex(i => (i + 1) % TYPED_STRINGS.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <span className="text-[#00F5FF] font-mono">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function Hero() {
  const [particlesLoaded, setParticlesLoaded] = useState(false)

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ['#00F5FF', '#7C3AED', '#ffffff'] },
      links: {
        color: '#00F5FF',
        distance: 120,
        enable: true,
        opacity: 0.15,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: false,
        speed: 0.6,
        straight: false,
      },
      number: {
        density: { enable: true, area: 900 },
        value: 60,
      },
      opacity: { value: 0.4 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F5FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Freelance badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
        >
          <span className="pulse-dot" />
          <span className="text-sm font-mono text-gray-300">
            Disponible pour missions freelance
          </span>
        </motion.div>

        {/* Main glitch title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1
            className="glitch font-grotesk font-bold text-white mb-4 leading-none select-none"
            data-text="LAKHAL MOHAMED"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          >
            <span className="gradient-text">LAKHAL</span>{' '}
            <span className="text-white">MOHAMED</span>
          </h1>
        </motion.div>

        {/* Typed subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl sm:text-2xl md:text-3xl font-grotesk text-gray-300 mb-6 h-10"
        >
          <TypedText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-grotesk"
        >
          Ingénieur passionné par les systèmes embarqués, le développement web moderne et
          l'intelligence artificielle. Formateur certifié IA.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="projects" smooth duration={500} offset={-64}>
            <button className="btn-primary">
              <span>🚀 Voir mes projets</span>
            </button>
          </Link>

          <a
            href="/CV_Mohamed_Lakhal.pdf"
            download
            className="btn-outline"
          >
            📄 Télécharger CV
          </a>

          <Link to="contact" smooth duration={500} offset={-64}>
            <button className="btn-outline" style={{ borderColor: '#7C3AED', color: '#9B6FFF' }}>
              ✉️ Me contacter
            </button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#00F5FF]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
