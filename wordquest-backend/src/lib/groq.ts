import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!
})

// Generate a story for a chapter
export async function generateStory(word: string, worldTheme: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'user',
        content: `Write a short immersive story (150-200 words) set in a ${worldTheme} world.
        The story must naturally use the word "${word}" at least 3 times in context.
        The story should be exciting, engaging and appropriate for English learners.
        Only return the story text, nothing else.`
      }
    ],
    max_tokens: 500,
  })
  return completion.choices[0]?.message?.content || ''
}

// Check if a sentence uses a word correctly
export async function checkSentence(word: string, sentence: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'user',
        content: `A student is learning the English word "${word}".
        They wrote this sentence: "${sentence}"
        Check if they used "${word}" correctly.
        Give friendly, encouraging feedback in 2-3 sentences.
        If correct, praise them. If wrong, explain why and give a correct example.
        Only return the feedback, nothing else.`
      }
    ],
    max_tokens: 200,
  })
  return completion.choices[0]?.message?.content || ''
}

// AI tutor chat
export async function chatWithTutor(
  worldTheme: string,
  characterName: string,
  word: string,
  userMessage: string,
  chatHistory: { role: string; text: string }[]
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: `You are ${characterName}, a character from a ${worldTheme} world in an English learning game called WordQuest.
        The student is learning the word "${word}".
        Stay in character but help them understand English words, grammar and usage.
        Keep responses short (2-3 sentences), friendly and in character.`
      },
      ...chatHistory.map(h => ({
        role: h.role as 'user' | 'assistant',
        content: h.text
      })),
      {
        role: 'user',
        content: userMessage
      }
    ],
    max_tokens: 200,
  })
  return completion.choices[0]?.message?.content || ''
}

// Generate weekly quiz
export async function generateQuiz(words: string[]): Promise<any> {
  const completion = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'user',
        content: `Create a 5-question multiple choice quiz for these English words: ${words.join(', ')}.
        Return ONLY a JSON array with this exact format, no markdown, no extra text:
        [
          {
            "question": "The beauty of the sunset was _______ - it lasted only a moment.",
            "options": ["eternal", "ephemeral", "powerful", "dull"],
            "answer": "ephemeral",
            "word": "ephemeral"
          }
        ]`
      }
    ],
    max_tokens: 1000,
  })
  const text = completion.choices[0]?.message?.content || '[]'
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}