import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// GET today's word
router.get('/today', async (req: Request, res: Response) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const word = await prisma.word.findFirst({
      where: {
        date: { gte: today }
      },
      include: { world: true }
    })

    if (!word) {
      return res.status(404).json({ success: false, message: 'No word for today' })
    }

    res.json({ success: true, data: word })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch word' })
  }
})

// GET word by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const word = await prisma.word.findUnique({
      where: { id: String(req.params.id) },
      include: { world: true }
    })
    if (!word) {
      return res.status(404).json({ success: false, message: 'Word not found' })
    }
    res.json({ success: true, data: word })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch word' })
  }
})

export default router