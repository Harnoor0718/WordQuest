import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const gemini = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

// Generate a story for a chapter
export async function generateStory(word: string, worldTheme: string): Promise<string> {
  const prompt = `Write a short immersive story (150-200 words) set in a ${worldTheme} world.
  The story must naturally use the word "${word}" at least 3 times in context.
  The story should be exciting, engaging and appropriate for English learners.
  Only return the story text, nothing else.`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

// Check if a sentence uses a word correctly
export async function checkSentence(word: string, sentence: string): Promise<string> {
  const prompt = `A student is learning the English word "${word}".
  They wrote this sentence: "${sentence}"
  
  Check if they used "${word}" correctly.
  Give friendly, encouraging feedback in 2-3 sentences.
  If correct, praise them. If wrong, explain why and give a correct example.
  Only return the feedback, nothing else.`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

// AI tutor chat
export async function chatWithTutor(
  worldTheme: string,
  characterName: string,
  word: string,
  userMessage: string,
  chatHistory: { role: string; text: string }[]
): Promise<string> {
  const systemContext = `You are ${characterName}, a character from a ${worldTheme} world in an English learning game called WordQuest.
  The student is learning the word "${word}".
  Stay in character but help them understand English words, grammar and usage.
  Keep responses short (2-3 sentences), friendly and in character.
  Current conversation history: ${JSON.stringify(chatHistory)}`

  const prompt = `${systemContext}\n\nStudent says: "${userMessage}"\n\n${characterName} responds:`

  const result = await gemini.generateContent(prompt)
  return result.response.text()
}

// Generate weekly quiz
export async function generateQuiz(words: string[]): Promise<any> {
  const prompt = `Create a 5-question multiple choice quiz for these English words: ${words.join(', ')}.
  
  Return ONLY a JSON array with this exact format, no markdown:
  [
    {
      "question": "The beauty of the sunset was _______ - it lasted only a moment.",
      "options": ["eternal", "ephemeral", "powerful", "dull"],
      "answer": "ephemeral",
      "word": "ephemeral"
    }
  ]`

  const result = await gemini.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}