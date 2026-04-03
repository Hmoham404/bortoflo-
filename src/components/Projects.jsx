import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projectsData } from '../data/projects'

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? 10 : 0}px)`,
        transition: hovered ? 'transform 0.1s' : 'transform 0.5s ease',
      }}
      className="glass rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group"
    >
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 60%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.emoji}</span>
          <h3 className="font-grotesk font-bold text-white text-base sm:text-lg leading-tight">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <a
            href={project.github}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs font-mono"
            title="GitHub"
          >
            GH
          </a>
          <a
            href={project.demo}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0A0A0F] text-xs font-bold transition-all"
            style={{ background: project.color }}
            title="Demo"
          >
            ↗
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed relative z-10">{project.description}</p>

      {/* Features */}
      <ul className="flex flex-col gap-1.5 relative z-10">
        {project.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
            <span style={{ color: project.color }}>◆</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md"
            style={{
              color: project.color,
              background: `${project.color}12`,
              border: `1px solid ${project.color}30`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-pad relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3">// projets</p>
            <h2 className="section-title text-white mx-auto">Réalisations</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
              Une sélection de projets qui illustrent mon expertise technique et ma créativité.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
