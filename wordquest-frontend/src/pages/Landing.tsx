import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const worlds = [
  {
    id: 'fantasy',
    emoji: '🏰',
    name: 'Fantasy Kingdom',
    subtitle: 'Chapter I',
    desc: 'Master ancient words through dragons, spells & royal quests',
    bg: 'radial-gradient(ellipse at center, #2d1b69 0%, #0a0612 70%)',
    accent: '#a855f7',
    particle: '✨',
    locked: false,
  },
  {
    id: 'space',
    emoji: '🚀',
    name: 'Space Exploration',
    subtitle: 'Chapter II',
    desc: 'Decode alien transmissions across galaxies & star systems',
    bg: 'radial-gradient(ellipse at center, #0c1a4d 0%, #0a0612 70%)',
    accent: '#3b82f6',
    particle: '⭐',
    locked: false,
  },
  {
    id: 'timetravel',
    emoji: '⏳',
    name: 'Time Travel',
    subtitle: 'Chapter III',
    desc: 'Jump through eras & solve the mysteries of history',
    bg: 'radial-gradient(ellipse at center, #4a2000 0%, #0a0612 70%)',
    accent: '#f59e0b',
    particle: '🌀',
    locked: true,
  },
  {
    id: 'cyberpunk',
    emoji: '🤖',
    name: 'Cyberpunk City',
    subtitle: 'Chapter IV',
    desc: 'Hack through neon streets in a dystopian future',
    bg: 'radial-gradient(ellipse at center, #003d2b 0%, #0a0612 70%)',
    accent: '#10b981',
    particle: '💾',
    locked: true,
  },
  {
    id: 'realstories',
    emoji: '📰',
    name: 'Real Stories',
    subtitle: 'Chapter V',
    desc: 'Relive Harshad Mehta, Enron & the greatest real events',
    bg: 'radial-gradient(ellipse at center, #4a0000 0%, #0a0612 70%)',
    accent: '#ef4444',
    particle: '📜',
    locked: true,
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: containerRef })

  return (
    <div className="bg-game h-screen overflow-hidden relative" style={{ background: '#0a0612' }}>

      {/* Stars */}
      <div className="stars" />

      {/* GAME HUD - TOP */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(10,6,18,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(244,197,66,0.15)' }}>

        {/* Logo */}
        <span className="font-game text-base text-yellow-400 tracking-wider"
          style={{ textShadow: '0 0 20px rgba(244,197,66,0.6)' }}>
          ⚔️ WORDQUEST
        </span>

        {/* Progress bar - world map progress */}
        <div className="hidden md:flex items-center gap-3 flex-1 mx-12">
          <span className="text-xs text-gray-500 font-title">WORLD MAP</span>
          <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                width: useTransform(scrollXProgress, [0, 1], ['0%', '100%']),
                background: 'linear-gradient(90deg, #a855f7, #f4c542)',
                boxShadow: '0 0 10px rgba(244,197,66,0.5)'
              }}
            />
          </div>
          <span className="text-xs text-gray-500 font-title">5 WORLDS</span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/onboarding')}
          className="font-title font-bold px-5 py-2 rounded-full text-sm text-black"
          style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 15px rgba(244,197,66,0.4)' }}
        >
          Begin Quest ⚔️
        </motion.button>
      </div>

      {/* HORIZONTAL SCROLL CONTAINER */}
      <div
        ref={containerRef}
        className="flex h-screen overflow-x-scroll overflow-y-hidden"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {/* ===== INTRO PANEL ===== */}
        <div className="min-w-screen h-screen flex items-center justify-center relative flex-shrink-0"
          style={{
            width: '100vw',
            scrollSnapAlign: 'start',
            background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0612 70%)'
          }}>

          {/* Floating emojis */}
          {['⚔️', '🏆', '🔮', '🐉', '📖'].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl hidden lg:block"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 2) * 50}%`,
                filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.6))'
              }}
              animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
            >
              {emoji}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center px-8 relative z-10 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block text-xs font-bold px-5 py-2 rounded-full mb-8 tracking-widest font-title"
              style={{ background: 'rgba(244,197,66,0.1)', border: '1px solid rgba(244,197,66,0.3)', color: '#f4c542' }}
            >
              ✨ SCROLL TO EXPLORE THE WORLD MAP →
            </motion.div>

            <h1 className="font-game text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-white">Master English</span>
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #f4c542, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(244,197,66,0.4))'
              }}>
                One Quest at a Time
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
              Learn a new English word every day through immersive AI stories.
              5 worlds. Infinite adventures. Real knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(244,197,66,0.7)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/onboarding')}
                className="font-title font-bold px-10 py-4 rounded-full text-lg text-black"
                style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 25px rgba(244,197,66,0.4)' }}
              >
                Start Your Quest 🗡️
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-title font-bold px-10 py-4 rounded-full text-lg text-white"
                style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)' }}
              >
                Watch Demo ▶
              </motion.button>
            </div>

            {/* Scroll hint */}
            <motion.div
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center justify-center gap-3 text-gray-500 text-sm font-title"
            >
              <span>SCROLL TO EXPLORE</span>
              <span className="text-2xl">→</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ===== WORLD PANELS ===== */}
        {worlds.map((world, i) => (
          <div
            key={world.id}
            className="min-w-screen h-screen flex items-center justify-center relative flex-shrink-0"
            style={{ width: '100vw', scrollSnapAlign: 'start', background: world.bg }}
          >
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at center, ${world.accent}15 0%, transparent 70%)`,
              pointerEvents: 'none'
            }} />

            {/* Floating particles */}
            {[...Array(5)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute text-2xl"
                style={{ left: `${15 + j * 18}%`, top: `${15 + (j % 3) * 25}%` }}
                animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2 + j, repeat: Infinity, delay: j * 0.4 }}
              >
                {world.particle}
              </motion.div>
            ))}

            {/* Chapter number */}
            <div className="absolute top-24 left-8 md:left-16">
              <span className="font-game text-xs tracking-widest"
                style={{ color: world.accent, textShadow: `0 0 10px ${world.accent}` }}>
                {world.subtitle}
              </span>
            </div>

            {/* Lock indicator */}
            {world.locked && (
              <div className="absolute top-24 right-8 md:right-16 flex items-center gap-2 text-gray-500 text-sm font-title">
                🔒 LOCKED
              </div>
            )}

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center px-8 relative z-10 max-w-3xl"
            >
              {/* World emoji */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-8xl md:text-9xl mb-8"
                style={{ filter: `drop-shadow(0 0 40px ${world.accent})` }}
              >
                {world.emoji}
              </motion.div>

              <h2 className="font-game text-3xl md:text-5xl font-black mb-4 text-white"
                style={{ textShadow: `0 0 30px ${world.accent}50` }}>
                {world.name}
              </h2>

              <p className="text-gray-300 text-lg md:text-xl mb-10 font-body max-w-xl mx-auto">
                {world.desc}
              </p>

              {/* Word preview card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block rounded-2xl px-8 py-5 mb-8 text-left"
                style={{
                  background: `rgba(0,0,0,0.4)`,
                  border: `1px solid ${world.accent}40`,
                  boxShadow: `0 0 30px ${world.accent}20`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="text-xs font-title tracking-widest mb-2" style={{ color: world.accent }}>
                  TODAY'S WORD
                </div>
                <div className="font-game text-2xl text-white mb-1">
                  {['Ephemeral', 'Nebulous', 'Temporal', 'Cipher', 'Infamous'][i]}
                </div>
                <div className="text-gray-400 text-sm font-body">
                  {['lasting for a very short time', 'unclear or hazy', 'relating to time', 'a secret code', 'well known for bad reasons'][i]}
                </div>
              </motion.div>

              <br />

              {world.locked ? (
                <div className="inline-block font-title font-bold px-8 py-3 rounded-full text-gray-500 text-sm"
                  style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                  🔒 Complete previous worlds to unlock
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${world.accent}80` }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/onboarding')}
                  className="font-title font-bold px-10 py-4 rounded-full text-base text-black"
                  style={{ background: `linear-gradient(135deg, ${world.accent}, ${world.accent}aa)`, boxShadow: `0 0 20px ${world.accent}50` }}
                >
                  Enter World →
                </motion.button>
              )}
            </motion.div>

            {/* World number indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
              {worlds.map((_, j) => (
                <div key={j} className="w-2 h-2 rounded-full transition-all"
                  style={{ background: j === i ? world.accent : 'rgba(255,255,255,0.2)', boxShadow: j === i ? `0 0 8px ${world.accent}` : 'none' }} />
              ))}
            </div>
          </div>
        ))}

        {/* ===== FINAL CTA PANEL ===== */}
        <div className="min-w-screen h-screen flex items-center justify-center relative flex-shrink-0"
          style={{ width: '100vw', scrollSnapAlign: 'start', background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0612 70%)' }}>

          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(244,197,66,0.1) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center px-8 relative z-10"
          >
            <div className="text-7xl mb-8" style={{ filter: 'drop-shadow(0 0 30px rgba(244,197,66,0.8))' }}>🏆</div>
            <h2 className="font-game text-3xl md:text-6xl font-black mb-6 text-white">
              Ready to Become a{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f4c542, #ff9500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(244,197,66,0.5))'
              }}>WordMaster?</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 font-body max-w-xl mx-auto">
              Join thousands of learners. One word a day. Five worlds to conquer.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {['🔥 Daily Streaks', '⚡ XP & Levels', '🤖 AI Tutor', '🌍 5 Worlds'].map((badge) => (
                <span key={badge} className="text-sm text-gray-300 px-5 py-2 rounded-full font-body"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {badge}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(244,197,66,0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="font-title font-bold px-14 py-5 rounded-full text-xl text-black"
              style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 30px rgba(244,197,66,0.4)' }}
            >
              Begin Your Adventure 🗡️
            </motion.button>
          </motion.div>
        </div>

      </div>

      {/* Scroll arrows hint */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col gap-2 items-center">
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-gray-500 text-sm font-title flex items-center gap-2"
        >
          SCROLL <span className="text-xl">→</span>
        </motion.div>
      </div>

    </div>
  )
}