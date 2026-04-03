import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Link } from 'react-scroll'

const navLinks = [
  { to: 'about', label: 'À Propos' },
  { to: 'skills', label: 'Compétences' },
  { to: 'experience', label: 'Expérience' },
  { to: 'projects', label: 'Projets' },
  { to: 'education', label: 'Formation' },
  { to: 'contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0A0A0F] font-bold font-mono text-xs"
                style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)' }}
              >
                ML
              </div>
              <span className="font-grotesk font-bold text-white">Mohamed Lakhal</span>
            </div>
            <p className="text-xs text-gray-500 font-mono">
              Ingénieur Systèmes Embarqués & Dev Full-Stack IA
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-64}
                className="text-xs text-gray-500 hover:text-[#00F5FF] transition-colors font-mono"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Hmoham404"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <Icon icon="mdi:github" width={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-lakhal-874ab1218/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0A66C2] transition-all"
            >
              <Icon icon="mdi:linkedin" width={16} />
            </a>
            <a
              href="mailto:Lakhalm300@gmail.com"
              className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00F5FF] transition-all"
            >
              <Icon icon="mdi:email" width={16} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 font-mono">
            © {year} Mohamed Lakhal. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-600 font-mono flex items-center gap-1">
            Réalisé avec{' '}
            <span className="text-[#00F5FF]">React</span> +{' '}
            <span className="text-[#7C3AED]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
