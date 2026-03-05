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

  // AI endpoints
  generateStory: async (word: string, worldTheme: string) => {
    const res = await fetch(`${BASE_URL}/ai/story`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, worldTheme })
    })
    return res.json()
  },

  checkSentence: async (word: string, sentence: string) => {
    const res = await fetch(`${BASE_URL}/ai/check-sentence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word, sentence })
    })
    return res.json()
  },

  chatWithTutor: async (worldTheme: string, characterName: string, word: string, userMessage: string, chatHistory: any[]) => {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ worldTheme, characterName, word, userMessage, chatHistory })
    })
    return res.json()
  },

  // Auth endpoints
  register: async (name: string, email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    return res.json()
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    return res.json()
  },
}