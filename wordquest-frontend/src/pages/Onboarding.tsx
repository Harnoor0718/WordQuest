import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const worlds = [
  {
    id: 'fantasy', emoji: '🏰', name: 'Fantasy Kingdom', subtitle: 'WHERE LEGENDS ARE BORN',
    desc: 'Dragons, spells & ancient scrolls', accent: '#a855f7',
    bg: 'radial-gradient(ellipse at center, #2d1b69 0%, #0a0612 80%)',
    particles: ['⚔️', '🐉', '✨', '🔮', '👑'],
  },
  {
    id: 'space', emoji: '🚀', name: 'Space Exploration', subtitle: 'BEYOND THE STARS',
    desc: 'Decode alien transmissions across galaxies', accent: '#3b82f6',
    bg: 'radial-gradient(ellipse at center, #0c1a4d 0%, #0a0612 80%)',
    particles: ['⭐', '🌙', '🪐', '☄️', '🛸'],
  },
  {
    id: 'timetravel', emoji: '⏳', name: 'Time Travel', subtitle: 'REWRITE HISTORY',
    desc: 'Jump through eras & solve mysteries', accent: '#f59e0b',
    bg: 'radial-gradient(ellipse at center, #4a2000 0%, #0a0612 80%)',
    particles: ['🌀', '⚡', '🕰️', '📜', '🗺️'],
  },
  {
    id: 'cyberpunk', emoji: '🤖', name: 'Cyberpunk City', subtitle: 'HACK THE FUTURE',
    desc: 'Neon streets, dystopia & digital warfare', accent: '#10b981',
    bg: 'radial-gradient(ellipse at center, #003d2b 0%, #0a0612 80%)',
    particles: ['💾', '⚡', '🔋', '💻', '🌐'],
  },
  {
    id: 'realstories', emoji: '📰', name: 'Real Stories', subtitle: 'TRUTH IS STRANGER THAN FICTION',
    desc: 'Harshad Mehta, Enron & the greatest scandals', accent: '#ef4444',
    bg: 'radial-gradient(ellipse at center, #4a0000 0%, #0a0612 80%)',
    particles: ['📜', '💰', '🏛️', '⚖️', '🔍'],
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const activeWorld = worlds.find(w => w.id === (hovered || selected))

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0612' }}>

      {/* Dynamic background that changes with hover */}
      <AnimatePresence mode="wait">
        {activeWorld && (
          <motion.div
            key={activeWorld.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-0"
            style={{ background: activeWorld.bg }}
          />
        )}
      </AnimatePresence>

      {/* Stars */}
      <div className="stars" />

      {/* Floating particles from active world */}
      <AnimatePresence>
        {activeWorld && activeWorld.particles.map((p, i) => (
          <motion.div
            key={`${activeWorld.id}-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1, y: [0, -40, 0] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
            className="fixed text-3xl pointer-events-none z-10"
            style={{ left: `${10 + i * 20}%`, top: `${60 + (i % 2) * 20}%` }}
          >
            {p}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 text-gray-400 font-title text-sm flex items-center gap-2 hover:text-white transition px-4 py-2 rounded-full"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        ← Back
      </motion.button>

      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24">
        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="w-full max-w-6xl"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block text-xs font-title tracking-widest px-4 py-2 rounded-full mb-4"
                  style={{ background: 'rgba(244,197,66,0.1)', border: '1px solid rgba(244,197,66,0.3)', color: '#f4c542' }}
                >
                  STEP 1 OF 2 — CHOOSE YOUR WORLD
                </motion.div>
                <h1 className="font-game text-4xl md:text-6xl font-black text-white mb-3">
                  Where Does Your{' '}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWorld?.id || 'default'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        background: activeWorld
                          ? `linear-gradient(135deg, ${activeWorld.accent}, ${activeWorld.accent}88)`
                          : 'linear-gradient(135deg, #f4c542, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: activeWorld ? `drop-shadow(0 0 20px ${activeWorld.accent}60)` : 'none'
                      }}
                    >
                      {activeWorld ? activeWorld.name : 'Adventure'}
                    </motion.span>
                  </AnimatePresence>
                  {' '}Begin?
                </h1>
                <p className="text-gray-500 font-body text-base">Hover to preview • Click to select</p>
              </div>

              {/* World Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                {worlds.map((world, i) => (
                  <motion.div
                    key={world.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(world.id)}
                    onHoverStart={() => setHovered(world.id)}
                    onHoverEnd={() => setHovered(null)}
                    className="rounded-2xl p-6 cursor-pointer relative overflow-hidden flex flex-col items-center text-center"
                    style={{
                      background: selected === world.id
                        ? `linear-gradient(135deg, ${world.accent}30, ${world.accent}10)`
                        : 'rgba(255,255,255,0.03)',
                      border: `2px solid ${selected === world.id ? world.accent : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: selected === world.id ? `0 0 40px ${world.accent}40, inset 0 0 40px ${world.accent}10` : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {/* Selected checkmark */}
                    <AnimatePresence>
                      {selected === world.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-black"
                          style={{ background: world.accent }}
                        >✓</motion.div>
                      )}
                    </AnimatePresence>

                    {/* Portal ring effect */}
                    <motion.div
                      animate={selected === world.id ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="relative mb-4"
                    >
                      <div className="text-6xl"
                        style={{ filter: `drop-shadow(0 0 ${selected === world.id ? '25px' : '0px'} ${world.accent})` }}>
                        {world.emoji}
                      </div>
                    </motion.div>

                    <div className="text-xs font-title tracking-widest mb-2" style={{ color: world.accent }}>
                      {world.subtitle}
                    </div>
                    <h3 className="font-title font-bold text-base mb-2 text-white">{world.name}</h3>
                    <p className="text-gray-500 text-xs font-body">{world.desc}</p>

                    {/* Bottom glow on selected */}
                    {selected === world.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                        style={{ background: `linear-gradient(90deg, transparent, ${world.accent}, transparent)` }} />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Continue button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: selected ? 1.05 : 1 }}
                  whileTap={{ scale: selected ? 0.95 : 1 }}
                  onClick={() => selected && setStep(2)}
                  className="font-title font-bold px-14 py-4 rounded-full text-lg transition-all"
                  style={{
                    background: selected
                      ? `linear-gradient(135deg, ${worlds.find(w => w.id === selected)?.accent}, ${worlds.find(w => w.id === selected)?.accent}aa)`
                      : 'rgba(255,255,255,0.05)',
                    color: selected ? 'white' : 'rgba(255,255,255,0.2)',
                    boxShadow: selected ? `0 0 30px ${worlds.find(w => w.id === selected)?.accent}50` : 'none',
                    cursor: selected ? 'pointer' : 'not-allowed',
                    border: selected ? 'none' : '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  {selected ? `Enter ${worlds.find(w => w.id === selected)?.name} →` : 'Select a World First'}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2 — Level */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="w-full max-w-xl"
            >
              <div className="text-center mb-10">
                <div className="inline-block text-xs font-title tracking-widest px-4 py-2 rounded-full mb-4"
                  style={{ background: 'rgba(244,197,66,0.1)', border: '1px solid rgba(244,197,66,0.3)', color: '#f4c542' }}>
                  STEP 2 OF 2 — YOUR LEVEL
                </div>
                <h1 className="font-game text-3xl md:text-5xl font-black text-white mb-3">
                  Choose Your <span style={{
                    background: 'linear-gradient(135deg, #f4c542, #ff9500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>Rank</span>
                </h1>
                <p className="text-gray-500 font-body">We'll match word difficulty to your level</p>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { level: 'Apprentice', desc: 'I know basic English words', emoji: '🌱', tag: 'Beginner', color: '#22c55e' },
                  { level: 'Scholar', desc: 'I can hold a conversation', emoji: '⚡', tag: 'Intermediate', color: '#f59e0b' },
                  { level: 'WordMaster', desc: 'I want challenging vocabulary', emoji: '🔥', tag: 'Advanced', color: '#ef4444' },
                ].map((item, i) => (
                  <motion.div
                    key={item.level}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-5 p-5 rounded-2xl cursor-pointer group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="text-4xl group-hover:scale-110 transition-transform"
                      style={{ filter: `drop-shadow(0 0 10px ${item.color}80)` }}>
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="font-title font-bold text-white text-lg">{item.level}</div>
                      <div className="text-gray-400 text-sm font-body">{item.desc}</div>
                    </div>
                    <div className="text-xs font-title px-3 py-1 rounded-full"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}40`, color: item.color }}>
                      {item.tag}
                    </div>
                    <div className="text-gray-600 group-hover:text-white transition-colors font-bold">→</div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <button onClick={() => setStep(1)}
                  className="text-gray-600 font-title text-sm hover:text-white transition">
                  ← Back to World Selection
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}