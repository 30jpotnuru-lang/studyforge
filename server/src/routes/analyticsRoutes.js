import express from 'express'
import authMiddleware from '../middleware/auth.js'
import Analytics from '../models/Analytics.js'
import Flashcard from '../models/Flashcard.js'
import QuizAttempt from '../models/QuizAttempt.js'

const router = express.Router()

router.get('/dashboard', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.userId

    // Get basic stats
    const flashcardsCount = await Flashcard.countDocuments({ userId })
    const masteredCount = await Flashcard.countDocuments({
      userId,
      masteryStatus: 'mastered'
    })
    const quizzes = await QuizAttempt.find({ userId }).sort({ completedAt: -1 }).limit(10)

    const averageAccuracy = quizzes.length > 0
      ? (quizzes.reduce((sum, q) => sum + q.accuracy, 0) / quizzes.length).toFixed(2)
      : 0

    // Get weekly activity
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weeklyQuizzes = await QuizAttempt.find({
      userId,
      completedAt: { $gte: sevenDaysAgo }
    })

    const chartData = Array(7)
      .fill(0)
      .map((_, i) => {
        const date = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
        const dayQuizzes = weeklyQuizzes.filter(q => {
          const qDate = new Date(q.completedAt)
          return qDate.toDateString() === date.toDateString()
        })
        const totalTime = dayQuizzes.reduce((sum, q) => sum + (q.timeSpent || 0), 0)
        return {
          day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
          time: Math.round(totalTime / 60) || 0
        }
      })

    res.json({
      stats: [
        {
          label: 'Flashcards',
          value: flashcardsCount,
          change: 12
        },
        {
          label: 'Mastered',
          value: masteredCount,
          change: 8
        },
        {
          label: 'Quizzes Done',
          value: quizzes.length,
          change: 5
        },
        {
          label: 'Avg Accuracy',
          value: `${averageAccuracy}%`,
          change: 3
        }
      ],
      chartData
    })
  } catch (error) {
    next(error)
  }
})

router.get('/progress', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.userId

    const analytics = await Analytics.findOne({ userId })
    res.json({ analytics })
  } catch (error) {
    next(error)
  }
})

router.get('/weak-areas', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.userId

    const weakCards = await Flashcard.find({
      userId,
      masteryStatus: { $in: ['learning', 'familiar'] }
    }).limit(10)

    res.json({ weakAreas: weakCards })
  } catch (error) {
    next(error)
  }
})

export default router
