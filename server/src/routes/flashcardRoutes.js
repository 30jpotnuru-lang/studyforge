import express from 'express'
import {
  generateFlashcardsFromUpload,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  recordFlashcardAttempt,
  deleteFlashcard,
  getFlashcardsForReview
} from '../controllers/flashcardController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/generate', authMiddleware, generateFlashcardsFromUpload)
router.get('/', authMiddleware, getFlashcards)
router.get('/review', authMiddleware, getFlashcardsForReview)
router.get('/:id', authMiddleware, getFlashcardById)
router.put('/:id', authMiddleware, updateFlashcard)
router.post('/:id/attempt', authMiddleware, recordFlashcardAttempt)
router.delete('/:id', authMiddleware, deleteFlashcard)

export default router
