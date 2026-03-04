import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'

const worldThemes: Record<string, { bg: string; accent: string }> = {
  fantasy: { bg: 'radial-gradient(ellipse at center, #2d1b69 0%, #0a0612 70%)', accent: '#a855f7' },
  space: { bg: 'radial-gradient(ellipse at center, #0c1a4d 0%, #0a0612 70%)', accent: '#3b82f6' },
  timetravel: { bg: 'radial-gradient(ellipse at center, #4a2000 0%, #0a0612 70%)', accent: '#f59e0b' },
  cyberpunk: { bg: 'radial-gradient(ellipse at center, #003d2b 0%, #0a0612 70%)', accent: '#10b981' },
  realstories: { bg: 'radial-gradient(ellipse at center, #4a0000 0%, #0a0612 70%)', accent: '#ef4444' },
}

export default function Chapter() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [chapter, setChapter] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'word' | 'story' | 'quiz'>('word')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await api.getChapter(id || '')
      if (res.success) setChapter(res.data)
      setLoading(false)
    }
    fetchChapter()
  }, [id])

  const theme = worldThemes[chapter?.world?.slug || 'fantasy']

  const quizOptions = chapter ? [
    chapter.word?.word,
    'Eternal', 'Powerful', 'Mysterious'
  ].sort(() => Math.random() - 0.5) : []

  const handleAnswer = (option: string) => {
    if (answered) return
    setSelectedAnswer(option)
    setAnswered(true)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0612' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-5xl"
      >
        ⚔️
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen relative" style={{ background: theme?.bg || '#0a0612' }}>
      <div className="stars" />

      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse at center, ${theme?.accent}15 0%, transparent 70%)`
      }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: 'rgba(10,6,18,0.9)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme?.accent}20` }}>
        <button onClick={() => navigate(-1)}
          className="text-gray-400 font-title text-sm flex items-center gap-2 hover:text-white transition">
          ← Back
        </button>
        <span className="font-game text-sm tracking-wider" style={{ color: theme?.accent }}>
          Chapter {chapter?.chapterNumber} — {chapter?.world?.name}
        </span>
        <div className="text-xs font-title px-3 py-1 rounded-full"
          style={{ background: `${theme?.accent}20`, color: theme?.accent, border: `1px solid ${theme?.accent}30` }}>
          +50 XP
        </div>
      </nav>

      <div className="relative z-10 pt-24 pb-20 px-4 max-w-3xl mx-auto">

        {/* Chapter title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-xs font-title tracking-widest mb-2" style={{ color: theme?.accent }}>
            CHAPTER {chapter?.chapterNumber}
          </div>
          <h1 className="font-game text-2xl md:text-4xl text-white mb-2">{chapter?.title}</h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {(['word', 'story', 'quiz'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-full text-sm font-title transition-all capitalize"
              style={{
                background: activeTab === tab ? theme?.accent : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? 'black' : 'rgba(255,255,255,0.4)',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
              }}
            >
              {tab === 'word' ? '📖 Word' : tab === 'story' ? '✨ Story' : '⚔️ Quest'}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">

          {/* WORD TAB */}
          {activeTab === 'word' && (
            <motion.div
              key="word"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${theme?.accent}30`,
                boxShadow: `0 0 40px ${theme?.accent}10`
              }}
            >
              {/* Word header */}
              <div className="flex items-end gap-4 mb-6 flex-wrap">
                <h2 className="font-game text-4xl md:text-5xl text-white"
                  style={{ textShadow: `0 0 30px ${theme?.accent}60` }}>
                  {chapter?.word?.word}
                </h2>
                <span className="text-gray-500 font-body text-lg mb-1">
                  /{chapter?.word?.pronunciation}/
                </span>
                <span className="text-xs font-title px-3 py-1 rounded-full mb-1"
                  style={{ background: `${theme?.accent}20`, color: theme?.accent, border: `1px solid ${theme?.accent}30` }}>
                  {chapter?.word?.partOfSpeech}
                </span>
              </div>

              <p className="text-gray-300 font-body text-lg mb-6">{chapter?.word?.definition}</p>

              {/* Examples */}
              <div className="mb-6">
                <div className="text-xs font-title tracking-widest text-gray-500 mb-3">EXAMPLES</div>
                {chapter?.word?.examples?.map((ex: string, i: number) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <span style={{ color: theme?.accent }}>→</span>
                    <p className="text-gray-400 font-body text-sm">{ex}</p>
                  </div>
                ))}
              </div>

              {/* Etymology + Memory tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl p-4"
                  style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <div className="text-xs font-title tracking-widest text-blue-400 mb-2">ETYMOLOGY</div>
                  <p className="text-gray-400 font-body text-sm">{chapter?.word?.etymology}</p>
                </div>
                <div className="rounded-xl p-4"
                  style={{ background: 'rgba(244,197,66,0.08)', border: '1px solid rgba(244,197,66,0.2)' }}>
                  <div className="text-xs font-title tracking-widest text-yellow-400 mb-2">MEMORY TIP</div>
                  <p className="text-gray-400 font-body text-sm">{chapter?.word?.memoryTip}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('story')}
                className="w-full font-title font-bold py-4 rounded-2xl text-white"
                style={{ background: `linear-gradient(135deg, ${theme?.accent}, ${theme?.accent}88)`, boxShadow: `0 0 20px ${theme?.accent}30` }}
              >
                Read the Story ✨ →
              </motion.button>
            </motion.div>
          )}

          {/* STORY TAB */}
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${theme?.accent}30`,
              }}
            >
              <div className="text-xs font-title tracking-widest mb-4" style={{ color: theme?.accent }}>
                ✨ {chapter?.title}
              </div>
              <div className="font-body text-gray-300 leading-relaxed text-base whitespace-pre-line mb-8">
                {chapter?.storyText?.split(chapter?.word?.word).map((part: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="font-bold" style={{ color: theme?.accent }}>
                        {chapter?.word?.word}
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('quiz')}
                className="w-full font-title font-bold py-4 rounded-2xl text-black"
                style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 20px rgba(244,197,66,0.3)' }}
              >
                Start the Quest ⚔️ →
              </motion.button>
            </motion.div>
          )}

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl p-6 md:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${theme?.accent}30`,
              }}
            >
              <div className="text-xs font-title tracking-widest text-yellow-400 mb-4">⚔️ COMPLETE THE QUEST</div>

              <p className="text-gray-300 font-body text-lg mb-8">
                "The dragon's beauty was _______ — it lasted only a single heartbeat before vanishing into smoke."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {quizOptions.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={!answered ? { scale: 1.02 } : {}}
                    whileTap={!answered ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(option)}
                    className="p-4 rounded-xl font-title text-left capitalize transition-all"
                    style={{
                      background: answered
                        ? option === chapter?.word?.word
                          ? 'rgba(34,197,94,0.2)'
                          : option === selectedAnswer
                            ? 'rgba(239,68,68,0.2)'
                            : 'rgba(255,255,255,0.03)'
                        : 'rgba(255,255,255,0.03)',
                      border: answered
                        ? option === chapter?.word?.word
                          ? '1px solid rgba(34,197,94,0.5)'
                          : option === selectedAnswer
                            ? '1px solid rgba(239,68,68,0.5)'
                            : '1px solid rgba(255,255,255,0.08)'
                        : `1px solid rgba(255,255,255,0.08)`,
                      color: 'white',
                      cursor: answered ? 'default' : 'pointer'
                    }}
                  >
                    {answered && option === chapter?.word?.word && '✅ '}
                    {answered && option === selectedAnswer && option !== chapter?.word?.word && '❌ '}
                    {option}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    {selectedAnswer === chapter?.word?.word ? (
                      <div className="mb-6">
                        <div className="text-4xl mb-2">🎉</div>
                        <div className="font-game text-xl text-green-400 mb-1">Correct! +50 XP</div>
                        <p className="text-gray-400 font-body text-sm">You've mastered "{chapter?.word?.word}"!</p>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className="text-4xl mb-2">💪</div>
                        <div className="font-game text-xl text-red-400 mb-1">Not quite!</div>
                        <p className="text-gray-400 font-body text-sm">
                          The correct answer was <span style={{ color: theme?.accent }}>{chapter?.word?.word}</span>. Try again tomorrow!
                        </p>
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/world/${chapter?.world?.slug}`)}
                      className="font-title font-bold px-10 py-4 rounded-full text-black"
                      style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 20px rgba(244,197,66,0.3)' }}
                    >
                      Back to World Map 🗺️
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}