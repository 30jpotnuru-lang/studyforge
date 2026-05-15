import Quiz from '../models/Quiz.js'
import QuizAttempt from '../models/QuizAttempt.js'
import Upload from '../models/Upload.js'
import { generateQuiz } from '../services/aiService.js'

export const generateQuizFromUpload = async (req, res, next) => {
  try {
    const { uploadId, questionCount = 10, questionType = 'multiple-choice' } = req.body

    const upload = await Upload.findOne({
      _id: uploadId,
      userId: req.user.userId
    })

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' })
    }

    if (!upload.extractedText) {
      return res.status(400).json({ message: 'Upload is still being processed' })
    }

    // Generate quiz using AI
    const result = await generateQuiz(
      upload.extractedText,
      upload.subject,
      questionCount,
      questionType
    )

    // Save quiz
    const quiz = new Quiz({
      uploadId,
      userId: req.user.userId,
      title: `${upload.subject} Quiz`,
      questions: result.questions,
      difficulty: 'medium',
      status: 'published'
    })

    await quiz.save()

    res.status(201).json({
      message: 'Quiz generated successfully',
      quiz
    })
  } catch (error) {
    next(error)
  }
}

export const getQuizzes = async (req, res, next) => {
  try {
    const { uploadId, page = 1, limit = 20 } = req.query

    const filter = { userId: req.user.userId }
    if (uploadId) filter.uploadId = uploadId

    const skip = (page - 1) * limit

    const quizzes = await Quiz.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Quiz.countDocuments(filter)

    res.json({
      quizzes,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.json({ quiz })
  } catch (error) {
    next(error)
  }
}

export const submitQuizAttempt = async (req, res, next) => {
  try {
    const { answers } = req.body
    const quizId = req.params.id

    const quiz = await Quiz.findOne({
      _id: quizId,
      userId: req.user.userId
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Grade the quiz
    let correctCount = 0
    const gradedAnswers = answers.map((answer, index) => {
      const question = quiz.questions[index]
      const isCorrect = answer.userAnswer === question.correctAnswer
      if (isCorrect) correctCount++
      return {
        questionIndex: index,
        userAnswer: answer.userAnswer,
        isCorrect,
        timeSpent: answer.timeSpent || 0
      }
    })

    const totalQuestions = quiz.questions.length
    const score = Math.round((correctCount / totalQuestions) * 100)
    const accuracy = (correctCount / totalQuestions) * 100

    // Save attempt
    const attempt = new QuizAttempt({
      quizId,
      userId: req.user.userId,
      answers: gradedAnswers,
      score,
      totalQuestions,
      correctAnswers: correctCount,
      accuracy,
      completedAt: new Date()
    })

    await attempt.save()

    res.json({
      message: 'Quiz submitted successfully',
      attempt: {
        id: attempt._id,
        score,
        accuracy,
        correctAnswers: correctCount,
        totalQuestions
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getQuizAttempts = async (req, res, next) => {
  try {
    const { quizId } = req.params

    const attempts = await QuizAttempt.find({
      quizId,
      userId: req.user.userId
    }).sort({ completedAt: -1 })

    res.json({ attempts })
  } catch (error) {
    next(error)
  }
}

export default {
  generateQuizFromUpload,
  getQuizzes,
  getQuizById,
  submitQuizAttempt,
  getQuizAttempts
}
