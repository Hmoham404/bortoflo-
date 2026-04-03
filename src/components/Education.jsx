import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const educationData = [
  {
    degree: "Diplôme National Ingénieur",
    field: "Microélectronique & Systèmes Embarqués",
    institution: "ISIMM — Institut Supérieur d'Informatique et de Mathématiques de Monastir",
    period: "2021 – 2024",
    emoji: "🎓",
    color: "#00F5FF",
    highlights: [
      "Mention Bien",
      "Projet de fin d'études chez LZ Industrie",
      "Spécialisation systèmes embarqués & FPGA",
    ]
  },
  {
    degree: "Licence STIC",
    field: "Sciences et Technologies de l'Information et de la Communication — Électronique & Informatique",
    institution: "ISIMM — Institut Supérieur d'Informatique et de Mathématiques de Monastir",
    period: "2018 – 2021",
    emoji: "📚",
    color: "#7C3AED",
    highlights: [
      "Formation pluridisciplinaire",
      "Électronique, informatique et télécommunications",
      "Bases solides en programmation et électronique",
    ]
  }
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-pad relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3">// formation</p>
            <h2 className="section-title text-white mx-auto">Parcours Académique</h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-[#00F5FF]/20 transition-all duration-300"
              >
                {/* Color accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
                />

                {/* Background circle */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: edu.color }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{edu.emoji}</span>
                    <div>
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded-full"
                        style={{
                          color: edu.color,
                          background: `${edu.color}15`,
                          border: `1px solid ${edu.color}30`,
                        }}
                      >
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-grotesk font-bold text-white text-lg mb-1">{edu.degree}</h3>
                  <p className="font-mono text-sm mb-2" style={{ color: edu.color }}>{edu.field}</p>
                  <p className="text-gray-400 text-xs mb-5 leading-relaxed">{edu.institution}</p>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-2">
                    {edu.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-300">
                        <span style={{ color: edu.color }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 glass rounded-xl p-4 flex items-center gap-4"
          >
            <span className="text-2xl">🏆</span>
            <div>
              <p className="text-white font-grotesk font-medium text-sm">Certifications</p>
              <p className="text-gray-400 text-xs mt-0.5">
                Formateur certifié en Intelligence Artificielle • Formation continue en Cloud & DevOps
              </p>
            </div>
            <div className="ml-auto flex-shrink-0">
              <span className="tech-tag">Certifié IA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
