import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const todayWord = {
  word: 'Ephemeral',
  pronunciation: 'eh-FEM-er-al',
  partOfSpeech: 'adjective',
  definition: 'Lasting for a very short time; transitory',
  examples: [
    'The ephemeral beauty of cherry blossoms makes them even more precious.',
    'Fame can be ephemeral — here today, gone tomorrow.',
    'The wizard cast an ephemeral spell that faded at dawn.',
  ],
  etymology: 'From Greek "ephemeros" — epi (on) + hemera (day)',
  memoryTip: 'Think of "a day" — ephemeral things last only a day! 🌸',
  xp: 50,
}

const stats = [
  { label: 'Day Streak', value: '7', emoji: '🔥', color: '#f59e0b' },
  { label: 'Total XP', value: '1,240', emoji: '⚡', color: '#a855f7' },
  { label: 'Words Learned', value: '23', emoji: '📖', color: '#3b82f6' },
  { label: 'Rank', value: 'Scholar', emoji: '🏆', color: '#10b981' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [wordRevealed, setWordRevealed] = useState(false)
  const [activeTab, setActiveTab] = useState<'word' | 'story' | 'quiz'>('word')

  return (
    <div className="min-h-screen relative" style={{ background: '#0a0612' }}>
      <div className="stars" />

      {/* Ambient glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(107,33,168,0.12) 0%, transparent 60%)'
      }} />

      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3"
        style={{ background: 'rgba(10,6,18,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(244,197,66,0.1)' }}>

        <span className="font-game text-base text-yellow-400 tracking-wider"
          style={{ textShadow: '0 0 20px rgba(244,197,66,0.5)' }}>
          ⚔️ WORDQUEST
        </span>

        {/* XP Bar */}
        <div className="hidden md:flex items-center gap-3 flex-1 mx-8">
          <span className="text-xs text-gray-500 font-title whitespace-nowrap">SCHOLAR • LVL 4</span>
          <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #a855f7, #f4c542)', boxShadow: '0 0 10px rgba(168,85,247,0.5)' }}
            />
          </div>
          <span className="text-xs text-gray-500 font-title whitespace-nowrap">1240 / 2000 XP</span>
        </div>

        {/* Streak + Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
            🔥 7
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-black"
            style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)' }}>
            H
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-20 pb-24 px-4 md:px-8 max-w-6xl mx-auto">

        {/* GREETING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 mt-4"
        >
          <p className="text-gray-500 font-title text-sm tracking-widest mb-1">GOOD MORNING, WARRIOR ⚔️</p>
          <h1 className="font-game text-2xl md:text-4xl text-white">
            Your Quest Awaits — <span style={{
              background: 'linear-gradient(135deg, #f4c542, #ff9500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Day 7</span>
          </h1>
        </motion.div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: `${stat.color}10`,
                border: `1px solid ${stat.color}30`,
              }}
            >
              <div className="text-2xl mb-2">{stat.emoji}</div>
              <div className="font-game text-xl md:text-2xl text-white"
                style={{ textShadow: `0 0 20px ${stat.color}60` }}>
                {stat.value}
              </div>
              <div className="text-xs font-title text-gray-500 mt-1">{stat.label}</div>
              <div className="absolute -bottom-3 -right-3 text-5xl opacity-10">{stat.emoji}</div>
            </motion.div>
          ))}
        </div>

        {/* MAIN CONTENT — Word of the Day */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Word Card (takes 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(168,85,247,0.2)',
              boxShadow: '0 0 40px rgba(107,33,168,0.15)'
            }}
          >
            {/* Card header */}
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(168,85,247,0.05)' }}>
              <div className="flex items-center gap-3">
                <span className="text-xl">📖</span>
                <div>
                  <div className="text-xs font-title tracking-widest text-purple-400">WORD OF THE DAY</div>
                  <div className="text-xs text-gray-600 font-body">Fantasy Kingdom • Chapter 7</div>
                </div>
              </div>
              <div className="text-xs font-title px-3 py-1 rounded-full"
                style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7' }}>
                +{todayWord.xp} XP
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-4">
              {(['word', 'story', 'quiz'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-xl text-sm font-title transition-all capitalize"
                  style={{
                    background: activeTab === tab ? 'rgba(168,85,247,0.2)' : 'transparent',
                    color: activeTab === tab ? '#a855f7' : 'rgba(255,255,255,0.3)',
                    border: activeTab === tab ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent'
                  }}
                >
                  {tab === 'word' ? '📖 Word' : tab === 'story' ? '✨ Story' : '⚔️ Quest'}
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">

                {/* WORD TAB */}
                {activeTab === 'word' && (
                  <motion.div
                    key="word"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {!wordRevealed ? (
                      <div className="text-center py-8">
                        <div className="text-6xl mb-6" style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.8))' }}>🔮</div>
                        <p className="text-gray-400 font-body mb-6">Your word for today is ready!</p>
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168,85,247,0.6)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setWordRevealed(true)}
                          className="font-title font-bold px-10 py-4 rounded-full text-white"
                          style={{ background: 'linear-gradient(135deg, #a855f7, #6b21a8)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}
                        >
                          Reveal Today's Word ✨
                        </motion.button>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        {/* Word */}
                        <div className="mb-6">
                          <div className="flex items-end gap-4 mb-2 flex-wrap">
                            <h2 className="font-game text-4xl md:text-5xl text-white"
                              style={{ textShadow: '0 0 30px rgba(168,85,247,0.5)' }}>
                              {todayWord.word}
                            </h2>
                            <span className="text-gray-500 font-body text-lg mb-1">/{todayWord.pronunciation}/</span>
                            <span className="text-xs font-title px-3 py-1 rounded-full mb-1"
                              style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.3)' }}>
                              {todayWord.partOfSpeech}
                            </span>
                          </div>
                          <p className="text-gray-300 font-body text-lg">{todayWord.definition}</p>
                        </div>

                        {/* Examples */}
                        <div className="mb-5">
                          <div className="text-xs font-title tracking-widest text-gray-500 mb-3">EXAMPLES</div>
                          {todayWord.examples.map((ex, i) => (
                            <div key={i} className="flex gap-3 mb-2">
                              <span style={{ color: '#a855f7' }}>→</span>
                              <p className="text-gray-400 font-body text-sm">{ex}</p>
                            </div>
                          ))}
                        </div>

                        {/* Etymology + Memory tip */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="rounded-xl p-4"
                            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                            <div className="text-xs font-title tracking-widest text-blue-400 mb-2">ETYMOLOGY</div>
                            <p className="text-gray-400 font-body text-sm">{todayWord.etymology}</p>
                          </div>
                          <div className="rounded-xl p-4"
                            style={{ background: 'rgba(244,197,66,0.08)', border: '1px solid rgba(244,197,66,0.2)' }}>
                            <div className="text-xs font-title tracking-widest text-yellow-400 mb-2">MEMORY TIP</div>
                            <p className="text-gray-400 font-body text-sm">{todayWord.memoryTip}</p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab('story')}
                          className="w-full mt-6 font-title font-bold py-4 rounded-2xl text-white"
                          style={{ background: 'linear-gradient(135deg, #a855f7, #6b21a8)', boxShadow: '0 0 20px rgba(168,85,247,0.3)' }}
                        >
                          Read Today's Story ✨ →
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* STORY TAB */}
                {activeTab === 'story' && (
                  <motion.div
                    key="story"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="rounded-2xl p-5 mb-5"
                      style={{ background: 'rgba(107,33,168,0.15)', border: '1px solid rgba(168,85,247,0.2)' }}>
                      <div className="text-xs font-title tracking-widest text-purple-400 mb-3">🏰 THE DRAGON'S EPHEMERAL FLAME</div>
                      <p className="text-gray-300 font-body text-sm leading-relaxed">
                        Deep in the Kingdom of Eldrath, the ancient dragon Korrax possessed a flame unlike any other.
                        Unlike the eternal fires of lesser dragons, his was <span className="text-purple-300 font-bold">ephemeral</span> —
                        it would glow brilliantly for just one moment before vanishing into the cold mountain air.
                        <br /><br />
                        The young wizard Aria had traveled for seven days to witness this <span className="text-purple-300 font-bold">ephemeral</span> wonder.
                        "Why does your flame last so briefly?" she asked. Korrax smiled wisely.
                        "Because the most beautiful things in life are <span className="text-purple-300 font-bold">ephemeral</span>, child.
                        A flame that burns forever holds no magic."
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('quiz')}
                      className="w-full font-title font-bold py-4 rounded-2xl text-black"
                      style={{ background: 'linear-gradient(135deg, #f4c542, #ff9500)', boxShadow: '0 0 20px rgba(244,197,66,0.3)' }}
                    >
                      Start Today's Quest ⚔️ →
                    </motion.button>
                  </motion.div>
                )}

                {/* QUIZ TAB */}
                {activeTab === 'quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-5">
                      <div className="text-xs font-title tracking-widest text-yellow-400 mb-3">⚔️ COMPLETE THE QUEST</div>
                      <p className="text-gray-300 font-body text-base mb-6">
                        "The dragon's beauty was _______ — it lasted only a single heartbeat."
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['eternal', 'ephemeral', 'powerful', 'mysterious'].map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 rounded-xl font-title text-left capitalize"
                            style={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: 'white'
                            }}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT SIDEBAR */}
          <div className="flex flex-col gap-4">

            {/* Active World */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-5 cursor-pointer"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(107,33,168,0.3), rgba(10,6,18,0.8))',
                border: '1px solid rgba(168,85,247,0.3)',
                boxShadow: '0 0 30px rgba(107,33,168,0.2)'
              }}
            >
              <div className="text-xs font-title tracking-widest text-purple-400 mb-3">ACTIVE WORLD</div>
              <div className="flex items-center gap-4">
                <div className="text-5xl" style={{ filter: 'drop-shadow(0 0 15px rgba(168,85,247,0.8))' }}>🏰</div>
                <div>
                  <div className="font-title font-bold text-white">Fantasy Kingdom</div>
                  <div className="text-gray-500 text-xs font-body">Chapter 7 of 30</div>
                  <div className="mt-2 h-1.5 w-32 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full w-1/4"
                      style={{ background: 'linear-gradient(90deg, #a855f7, #f4c542)' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly Streak Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-xs font-title tracking-widest text-gray-500 mb-4">THIS WEEK</div>
              <div className="flex justify-between gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-600 font-title">{day}</div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        background: i < 5 ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${i < 5 ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      {i < 5 ? '🔥' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl p-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-xs font-title tracking-widest text-gray-500 mb-4">🏆 TOP THIS WEEK</div>
              {[
                { name: 'Aria K.', xp: '2,340', rank: '1' },
                { name: 'You', xp: '1,240', rank: '4' },
                { name: 'Rohan M.', xp: '980', rank: '5' },
              ].map((user, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: i === 0 ? 'rgba(244,197,66,0.2)' : user.name === 'You' ? 'rgba(168,85,247,0.2)' : 'rgba(255,255,255,0.05)',
                      color: i === 0 ? '#f4c542' : user.name === 'You' ? '#a855f7' : 'white',
                      border: `1px solid ${i === 0 ? 'rgba(244,197,66,0.3)' : user.name === 'You' ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)'}`
                    }}>
                    {user.rank}
                  </div>
                  <div className="flex-1 font-body text-sm"
                    style={{ color: user.name === 'You' ? '#a855f7' : 'white' }}>
                    {user.name}
                  </div>
                  <div className="text-xs font-title text-gray-500">{user.xp} XP</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV — Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around py-3 px-4"
        style={{ background: 'rgba(10,6,18,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { icon: '🏠', label: 'Home', path: '/dashboard' },
          { icon: '🌍', label: 'Worlds', path: '/onboarding' },
          { icon: '🏆', label: 'Ranks', path: '/' },
          { icon: '👤', label: 'Profile', path: '/' },
        ].map((item) => (
          <button key={item.label} onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1">
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-title text-gray-500">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}