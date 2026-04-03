import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'mdi:github',
    href: 'https://github.com/Hmoham404',
    color: '#fff',
    label: 'github.com/Hmoham404',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    href: 'https://www.linkedin.com/in/mohamed-lakhal-874ab1218/',
    color: '#0A66C2',
    label: 'linkedin.com/in/mohamed-lakhal',
  },
  {
    name: 'Email',
    icon: 'mdi:email',
    href: 'mailto:Lakhalm300@gmail.com',
    color: '#00F5FF',
    label: 'Lakhalm300@gmail.com',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple mailto fallback
    const subject = encodeURIComponent(`Message de ${formState.name} — Portfolio`)
    const body = encodeURIComponent(`Nom: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.location.href = `mailto:Lakhalm300@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3">// contact</p>
            <h2 className="section-title text-white mx-auto">Travaillons Ensemble</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
              Disponible pour des missions freelance, des collaborations ou simplement pour échanger.
              N'hésitez pas à me contacter !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-gray-400" htmlFor="contact-name">
                      Nom complet
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-gray-400" htmlFor="contact-email">
                      Adresse email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-gray-400" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input resize-none"
                    rows={5}
                    placeholder="Votre message ici..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <span>{sent ? '✅ Message envoyé !' : '🚀 Envoyer le message'}</span>
                </button>
              </form>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Direct contacts */}
              <div className="glass rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="font-grotesk font-bold text-white text-sm mb-2">Contact direct</h3>
                <a
                  href="tel:+21628809961"
                  className="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#00F5FF] flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">Téléphone</div>
                    <div className="font-mono text-sm group-hover:text-[#00F5FF] transition-colors">+216 28 80 99 61</div>
                  </div>
                </a>
                <a
                  href="mailto:Lakhalm300@gmail.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-white group transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center text-[#00F5FF] flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono">Email</div>
                    <div className="font-mono text-sm group-hover:text-[#00F5FF] transition-colors">Lakhalm300@gmail.com</div>
                  </div>
                </a>
              </div>

              {/* Social links */}
              <div className="glass rounded-2xl p-6 flex flex-col gap-4">
                <h3 className="font-grotesk font-bold text-white text-sm mb-2">Réseaux sociaux</h3>
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-300 hover:text-white group transition-all"
                  >
                    <div
                      className="w-9 h-9 rounded-lg glass flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all"
                      style={{ '--glow': social.color }}
                    >
                      <Icon
                        icon={social.icon}
                        width={18}
                        style={{ color: social.color }}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-mono">{social.name}</div>
                      <div className="text-xs font-mono text-gray-400 truncate max-w-[160px]">{social.label}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))',
                  border: '1px solid rgba(0,245,255,0.15)',
                }}
              >
                <span className="pulse-dot flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-grotesk font-medium">Disponible</p>
                  <p className="text-gray-400 text-xs font-mono">Missions freelance & CDI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
