import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="gradient-text font-bold font-grotesk">
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  { target: 3, suffix: '+', label: "Années d'expérience" },
  { target: 10, suffix: '+', label: 'Projets réalisés' },
  { target: 2, suffix: '', label: 'Langues maîtrisées' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="about" className="section-pad relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left: Photo + decorative */}
          <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              {/* Rotating gradient border */}
              <div className="avatar-border w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden relative">
                <img
                  src="/photo.jpg"
                  alt="Mohamed Lakhal"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback si la photo n'est pas encore ajoutée
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback avatar (caché si photo présente) */}
                <div
                  className="w-full h-full absolute inset-0 items-center justify-center flex-col gap-3"
                  style={{
                    display: 'none',
                    background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 40%, #1A1A24 100%)',
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold font-grotesk"
                    style={{
                      background: 'linear-gradient(135deg, #00F5FF22, #7C3AED22)',
                      border: '2px solid rgba(0,245,255,0.3)',
                      color: '#00F5FF',
                    }}
                  >
                    ML
                  </div>
                  <span className="text-gray-500 font-mono text-xs">Mohamed Lakhal</span>
                </div>
              </div>

              {/* Floating tech badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-mono text-[#00F5FF]"
              >
                &lt;Ingénieur /&gt;
              </motion.div>

              {/* Decorative ring */}
              <div
                className="absolute -top-4 -left-4 w-20 h-20 rounded-full border border-[#7C3AED]/30 animate-spin"
                style={{ animationDuration: '12s' }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs sm:max-w-sm">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl mb-1">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 font-grotesk leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <motion.p
                variants={itemVariants}
                className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3"
              >
                // à propos
              </motion.p>
              <motion.h2 variants={itemVariants} className="section-title text-white">
                Qui suis-je ?
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-gray-300 text-base leading-relaxed">
              Ingénieur en systèmes embarqués avec une forte expertise en{' '}
              <span className="text-[#00F5FF]">développement web moderne</span> et en{' '}
              <span className="text-[#7C3AED]">intelligence artificielle</span>. Formateur certifié en IA,
              passionné par la création de solutions innovantes à l'intersection du hardware et du software.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-400 text-sm leading-relaxed">
              Titulaire d'un Diplôme National d'Ingénieur en Microélectronique & Systèmes Embarqués de l'ISIMM,
              j'ai travaillé sur des projets allant de la programmation bas niveau (C/C++, VHDL) aux applications
              web full-stack modernes (React, Django, Laravel), en passant par la data science et l'IA.
            </motion.p>

            {/* Tech pillars */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {['Systèmes Embarqués', 'Web Full-Stack', 'Intelligence Artificielle', 'IoT', 'Signal Processing'].map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </motion.div>

            {/* Links */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <a
                href="mailto:Lakhalm300@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-[#00F5FF] hover:underline font-mono"
              >
                📧 Lakhalm300@gmail.com
              </a>
              <a
                href="tel:+21628809961"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white font-mono"
              >
                📞 +216 28 80 99 61
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
