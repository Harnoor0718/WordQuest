import { Router, Request, Response } from 'express'
import { generateStory, checkSentence, chatWithTutor, generateQuiz } from '../lib/groq'
import { prisma } from '../lib/prisma'

const router = Router()

// Generate AI story for a chapter
router.post('/story', async (req: Request, res: Response) => {
  try {
    const { word, worldTheme } = req.body

    if (!word || !worldTheme) {
      return res.status(400).json({ success: false, message: 'word and worldTheme are required' })
    }

    const story = await generateStory(word, worldTheme)
    res.json({ success: true, data: { story } })
  } catch (error) {
    console.error('Story generation error:', error)
    res.status(500).json({ success: false, message: 'Failed to generate story' })
  }
})

// Check sentence
router.post('/check-sentence', async (req: Request, res: Response) => {
  try {
    const { word, sentence } = req.body

    if (!word || !sentence) {
      return res.status(400).json({ success: false, message: 'word and sentence are required' })
    }

    const feedback = await checkSentence(word, sentence)
    res.json({ success: true, data: { feedback } })
  } catch (error) {
    console.error('Sentence check error:', error)
    res.status(500).json({ success: false, message: 'Failed to check sentence' })
  }
})

// AI Tutor chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { worldTheme, characterName, word, userMessage, chatHistory } = req.body

    if (!worldTheme || !characterName || !word || !userMessage) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const reply = await chatWithTutor(
      worldTheme,
      characterName,
      word,
      userMessage,
      chatHistory || []
    )

    res.json({ success: true, data: { reply } })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ success: false, message: 'Failed to get tutor response' })
  }
})

// Generate weekly quiz
router.post('/quiz', async (req: Request, res: Response) => {
  try {
    const { words } = req.body

    if (!words || !Array.isArray(words)) {
      return res.status(400).json({ success: false, message: 'words array is required' })
    }

    const quiz = await generateQuiz(words)
    res.json({ success: true, data: { quiz } })
  } catch (error) {
    console.error('Quiz generation error:', error)
    res.status(500).json({ success: false, message: 'Failed to generate quiz' })
  }
})

export default router