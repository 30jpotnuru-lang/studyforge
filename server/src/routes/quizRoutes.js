import express from 'express'
import {
  generateQuizFromUpload,
  getQuizzes,
  getQuizById,
  submitQuizAttempt,
  getQuizAttempts
} from '../controllers/quizController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', authMiddleware, generateQuizFromUpload)
router.get('/', authMiddleware, getQuizzes)
router.get('/:id', authMiddleware, getQuizById)
router.post('/:id/submit', authMiddleware, submitQuizAttempt)
router.get('/:quizId/attempts', authMiddleware, getQuizAttempts)

export default router
