import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'

const router = Router()

// GET all worlds
router.get('/', async (req: Request, res: Response) => {
  try {
    const worlds = await prisma.world.findMany({
      include: {
        chapters: true,
        words: true
      }
    })
    res.json({ success: true, data: worlds })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch worlds' })
  }
})

// GET single world by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const world = await prisma.world.findUnique({
      where: { slug: String(req.params.slug) },
      include: {
        chapters: {
          orderBy: { chapterNumber: 'asc' }
        },
        words: true
      }
    })
    if (!world) {
      return res.status(404).json({ success: false, message: 'World not found' })
    }
    res.json({ success: true, data: world })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch world' })
  }
})

export default router