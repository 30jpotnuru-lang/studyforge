import { OpenAI } from 'openai'
import config from '../config/index.js'

const openai = new OpenAI({
  apiKey: config.openaiKey
})

export const generateFlashcards = async (content, subject, count = 10) => {
  try {
    const prompt = `You are an expert educator. Analyze the following study material and generate ${count} flashcards.

Subject: ${subject}

Material:
${content}

Generate flashcards in JSON format with this structure:
{
  "flashcards": [
    {
      "question": "question text",
      "answer": "answer text",
      "hint": "helpful hint",
      "difficulty": "easy|medium|hard",
      "topic": "topic name"
    }
  ]
}

Ensure questions focus on key concepts, use active recall principles, and avoid duplicates.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator creating high-quality flashcards for students.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const jsonMatch = response.choices[0].message.content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Failed to parse AI response')

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('AI flashcard generation error:', error)
    throw error
  }
}

export const generateQuiz = async (content, subject, questionCount = 10, questionType = 'multiple-choice') => {
  try {
    const prompt = `You are an expert educator. Create a ${questionCount}-question ${questionType} quiz based on this material.

Subject: ${subject}

Material:
${content}

Generate quiz questions in JSON format:
{
  "questions": [
    {
      "type": "${questionType}",
      "question": "question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "correct option",
      "explanation": "why this is correct",
      "difficulty": "easy|medium|hard"
    }
  ]
}

Focus on learning objectives and ensure questions test comprehension and application.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator creating assessment questions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const jsonMatch = response.choices[0].message.content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Failed to parse AI response')

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('AI quiz generation error:', error)
    throw error
  }
}

export const detectSubject = async (content) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at categorizing educational content. Return only the subject name, nothing else.'
        },
        {
          role: 'user',
          content: `What subject is this content about? Choose from: Mathematics, Science, Biology, Chemistry, Physics, English, History, Geography, Computer Science, Languages. Content: ${content.substring(0, 500)}`
        }
      ],
      temperature: 0.5,
      max_tokens: 50
    })

    return response.choices[0].message.content.trim()
  } catch (error) {
    console.error('Subject detection error:', error)
    return 'Custom'
  }
}

export const aiTutorChat = async (messages, uploadContext) => {
  try {
    const systemMessage = `You are an expert AI tutor. Use the provided study material to answer questions.
Study Material Context:
${uploadContext}

Provide clear, educational explanations. When appropriate, give hints instead of direct answers to encourage learning.`

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemMessage
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('AI tutor error:', error)
    throw error
  }
}

export default { generateFlashcards, generateQuiz, detectSubject, aiTutorChat }
