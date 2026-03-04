import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'

const worldThemes: Record<string, { bg: string; accent: string; particle: string }> = {
  fantasy: { bg: 'radial-gradient(ellipse at center, #2d1b69 0%, #0a0612 70%)', accent: '#a855f7', particle: '⚔️' },
  space: { bg: 'radial-gradient(ellipse at center, #0c1a4d 0%, #0a0612 70%)', accent: '#3b82f6', particle: '🚀' },
  timetravel: { bg: 'radial-gradient(ellipse at center, #4a2000 0%, #0a0612 70%)', accent: '#f59e0b', particle: '⏳' },
  cyberpunk: { bg: 'radial-gradient(ellipse at center, #003d2b 0%, #0a0612 70%)', accent: '#10b981', particle: '🤖' },
  realstories: { bg: 'radial-gradient(ellipse at center, #4a0000 0%, #0a0612 70%)', accent: '#ef4444', particle: '📰' },
}

export default function WorldMap() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [world, setWorld] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const theme = worldThemes[slug || 'fantasy']

  useEffect(() => {
    const fetchWorld = async () => {
      const res = await api.getWorld(slug || 'fantasy')
      if (res.success) setWorld(res.data)
      setLoading(false)
    }
    fetchWorld()
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0612' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-5xl"
      >
        {theme.particle}
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen relative" style={{ background: theme.bg }}>
      <div className="stars" />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse at center, ${theme.accent}15 0%, transparent 70%)`
      }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(10,6,18,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.accent}20` }}>
        <button onClick={() => navigate('/dashboard')}
          className="text-gray-400 font-title text-sm flex items-center gap-2 hover:text-white transition">
          ← Dashboard
        </button>
        <span className="font-game text-base tracking-wider" style={{ color: theme.accent }}>
          {world?.emoji} {world?.name}
        </span>
        <div className="w-20" />
      </nav>

      <div className="relative z-10 pt-24 pb-20 px-6 max-w-4xl mx-auto">

        {/* World Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl mb-6"
            style={{ filter: `drop-shadow(0 0 30px ${theme.accent})` }}
          >
            {world?.emoji}
          </motion.div>
          <h1 className="font-game text-4xl md:text-5xl text-white mb-3"
            style={{ textShadow: `0 0 30px ${theme.accent}50` }}>
            {world?.name}
          </h1>
          <p className="text-gray-400 font-body text-lg">{world?.description}</p>

          {/* Progress bar */}
          <div className="mt-6 max-w-sm mx-auto">
            <div className="flex justify-between text-xs font-title text-gray-500 mb-2">
              <span>PROGRESS</span>
              <span>{world?.chapters?.filter((c: any) => !c.isLocked).length || 0} / {world?.chapters?.length || 0} CHAPTERS</span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((world?.chapters?.filter((c: any) => !c.isLocked).length || 0) / (world?.chapters?.length || 1)) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}88)`, boxShadow: `0 0 10px ${theme.accent}` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Chapter Map */}
        <div className="relative">

          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${theme.accent}40, transparent)` }} />

          <div className="flex flex-col gap-6">
            {world?.chapters?.map((chapter: any, i: number) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Chapter card */}
                <motion.div
                  whileHover={!chapter.isLocked ? { scale: 1.02 } : {}}
                  onClick={() => !chapter.isLocked && navigate(`/chapter/${chapter.id}`)}
                  className="flex-1 rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: chapter.isLocked ? 'rgba(255,255,255,0.02)' : `${theme.accent}15`,
                    border: `1px solid ${chapter.isLocked ? 'rgba(255,255,255,0.06)' : theme.accent + '40'}`,
                    boxShadow: chapter.isLocked ? 'none' : `0 0 20px ${theme.accent}20`,
                    cursor: chapter.isLocked ? 'not-allowed' : 'pointer',
                    opacity: chapter.isLocked ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-title tracking-widest" style={{ color: theme.accent }}>
                      CHAPTER {chapter.chapterNumber}
                    </span>
                    {chapter.isLocked ? (
                      <span className="text-xs text-gray-600 font-title">🔒 LOCKED</span>
                    ) : (
                      <span className="text-xs font-title px-2 py-1 rounded-full"
                        style={{ background: `${theme.accent}20`, color: theme.accent }}>
                        AVAILABLE ✨
                      </span>
                    )}
                  </div>
                  <h3 className="font-title font-bold text-white text-lg mb-1">{chapter.title}</h3>
                  <p className="text-gray-500 text-sm font-body">
                    Word: <span style={{ color: theme.accent }}>{chapter.word?.word}</span>
                  </p>
                </motion.div>

                {/* Chapter node */}
                <div className="hidden md:flex w-12 h-12 rounded-full items-center justify-center font-game text-sm flex-shrink-0"
                  style={{
                    background: chapter.isLocked ? 'rgba(255,255,255,0.05)' : `${theme.accent}30`,
                    border: `2px solid ${chapter.isLocked ? 'rgba(255,255,255,0.1)' : theme.accent}`,
                    boxShadow: chapter.isLocked ? 'none' : `0 0 15px ${theme.accent}50`,
                    color: chapter.isLocked ? 'rgba(255,255,255,0.3)' : theme.accent,
                  }}>
                  {chapter.isLocked ? '🔒' : chapter.chapterNumber}
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}