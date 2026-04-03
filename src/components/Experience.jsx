import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experienceData } from '../data/experience'

const typeColors = {
  'CDI / Contrat': '#00F5FF',
  'Stage PFE': '#7C3AED',
  "Stage d'été": '#F59E0B',
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-pad relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3">// expérience</p>
            <h2 className="section-title text-white mx-auto">Parcours Professionnel</h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 timeline-line rounded-full" />

            <div className="flex flex-col gap-12">
              {experienceData.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="relative pl-16 sm:pl-24"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[9px] sm:left-[25px] top-6 timeline-dot" />

                  {/* Card */}
                  <div className="glass rounded-2xl p-6 sm:p-8 group hover:border-[#00F5FF]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F5FF]/5">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-grotesk font-bold text-white text-lg mb-1">{exp.role}</h3>
                        <div className="flex items-center gap-2">
                          <span className="gradient-text font-bold font-grotesk">{exp.company}</span>
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded-full"
                            style={{
                              color: typeColors[exp.type] || '#888',
                              background: `${typeColors[exp.type]}15` || '#88888815',
                              border: `1px solid ${typeColors[exp.type]}30` || '1px solid #88888830',
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-sm text-gray-500 whitespace-nowrap">{exp.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-2 mb-5">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[#00F5FF] mt-0.5 flex-shrink-0">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
