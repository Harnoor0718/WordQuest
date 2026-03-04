const BASE_URL = 'http://localhost:5000/api'

export const api = {
  getWorlds: async () => {
    const res = await fetch(`${BASE_URL}/worlds`)
    return res.json()
  },

  getWorld: async (slug: string) => {
    const res = await fetch(`${BASE_URL}/worlds/${slug}`)
    return res.json()
  },

  getTodayWord: async () => {
    const res = await fetch(`${BASE_URL}/words/today`)
    return res.json()
  },

  getChapter: async (id: string) => {
    const res = await fetch(`${BASE_URL}/chapters/${id}`)
    return res.json()
  },

  getChaptersByWorld: async (worldId: string) => {
    const res = await fetch(`${BASE_URL}/chapters/world/${worldId}`)
    return res.json()
  },
}