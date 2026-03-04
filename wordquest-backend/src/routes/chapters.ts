import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// GET all chapters for a world
router.get('/world/:worldId', async (req: Request, res: Response) => {
  try {
    const chapters = await prisma.chapter.findMany({
      where: { worldId: String(req.params.worldId) },
      orderBy: { chapterNumber: 'asc' },
      include: { word: true }
    })
    res.json({ success: true, data: chapters })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch chapters' })
  }
})

// GET single chapter
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: String(req.params.id) },
      include: { word: true, world: true }
    })
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' })
    }
    res.json({ success: true, data: chapter })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch chapter' })
  }
})

export default router
