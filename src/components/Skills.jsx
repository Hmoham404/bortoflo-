import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { skillsData } from '../data/skills'

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="glass rounded-xl p-4 flex flex-col items-center gap-3 group relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 0 20px ${skill.color}33, 0 0 40px ${skill.color}11` : 'none',
        borderColor: hovered ? `${skill.color}40` : 'rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.color}15, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <Icon
          icon={skill.icon}
          width={40}
          height={40}
          style={{ color: skill.color }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Name */}
      <span className="font-mono text-xs text-gray-300 group-hover:text-white transition-colors z-10 text-center">
        {skill.name}
      </span>

      {/* Level bar */}
      <div className="w-full bg-white/5 rounded-full h-0.5 z-10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: hovered ? `${skill.level}%` : '30%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, #7C3AED)` }}
        />
      </div>

      {/* Level label on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-2 right-2 text-[10px] font-mono z-10"
            style={{ color: skill.color }}
          >
            {skill.level}%
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('langages')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const activeCategory = skillsData.find(c => c.id === activeTab)

  return (
    <section id="skills" className="section-pad relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="font-mono text-[#00F5FF] text-sm tracking-widest mb-3">// compétences</p>
            <h2 className="section-title text-white mx-auto">Stack Technique</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
              Technologies et outils que je maîtrise, de l'embarqué au cloud.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {skillsData.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-grotesk font-medium transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'text-[#0A0A0F] font-bold'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                style={
                  activeTab === cat.id
                    ? { background: 'linear-gradient(135deg, #00F5FF, #7C3AED)', boxShadow: '0 0 20px rgba(0,245,255,0.3)' }
                    : {}
                }
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {activeCategory?.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
