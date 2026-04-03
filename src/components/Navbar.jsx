import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'

const navLinks = [
  { to: 'about', label: 'À Propos' },
  { to: 'skills', label: 'Compétences' },
  { to: 'experience', label: 'Expérience' },
  { to: 'projects', label: 'Projets' },
  { to: 'education', label: 'Formation' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="hero" smooth duration={500} className="flex items-center gap-3 group">
            <motion.div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#0A0A0F] font-bold font-mono text-xs tracking-wider relative overflow-hidden flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)' }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <span>ML</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-grotesk font-bold text-white text-sm">
                Mohamed <span className="text-[#00F5FF]">Lakhal</span>
              </span>
              <span className="font-mono text-[10px] text-gray-500 tracking-widest">ENGINEER · DEV · AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-64}
                className="relative px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
                activeClass="text-[#00F5FF]"
                spy
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  {link.label}
                </motion.span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00F5FF] to-[#7C3AED] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="contact" smooth duration={500} offset={-64}>
              <button className="btn-primary text-sm py-2 px-4">
                <span>Me contacter</span>
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block h-0.5 bg-[#00F5FF] transition-all"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-0.5 bg-[#00F5FF] transition-all"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block h-0.5 bg-[#00F5FF] transition-all"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-64}
                  className="px-4 py-3 text-gray-300 hover:text-[#00F5FF] hover:bg-white/5 rounded-lg transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
