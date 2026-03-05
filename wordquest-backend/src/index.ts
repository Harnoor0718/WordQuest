import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import worldRoutes from './routes/worlds'
import wordRoutes from './routes/words'
import chapterRoutes from './routes/chapters'
import aiRoutes from './routes/ai'
import authRoutes from './routes/auth'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/api/worlds', worldRoutes)
app.use('/api/words', wordRoutes)
app.use('/api/chapters', chapterRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: '⚔️ WordQuest API is running!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})