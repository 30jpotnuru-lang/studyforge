import Flashcard from '../models/Flashcard.js'
import Upload from '../models/Upload.js'
import { generateFlashcards } from '../services/aiService.js'

export const generateFlashcardsFromUpload = async (req, res, next) => {
  try {
    const { uploadId, count = 10 } = req.body

    // Verify upload exists and belongs to user
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

    // Generate flashcards using AI
    const result = await generateFlashcards(upload.extractedText, upload.subject, count)

    // Save flashcards to database
    const flashcards = await Promise.all(
      result.flashcards.map(fc => {
        const flashcard = new Flashcard({
          uploadId,
          userId: req.user.userId,
          question: fc.question,
          answer: fc.answer,
          hint: fc.hint,
          difficulty: fc.difficulty,
          topic: fc.topic,
          tags: fc.tags || []
        })
        return flashcard.save()
      })
    )

    res.status(201).json({
      message: 'Flashcards generated successfully',
      count: flashcards.length,
      flashcards
    })
  } catch (error) {
    next(error)
  }
}

export const getFlashcards = async (req, res, next) => {
  try {
    const { uploadId, difficulty, masteryStatus, page = 1, limit = 20 } = req.query

    const filter = { userId: req.user.userId }
    if (uploadId) filter.uploadId = uploadId
    if (difficulty) filter.difficulty = difficulty
    if (masteryStatus) filter.masteryStatus = masteryStatus

    const skip = (page - 1) * limit

    const flashcards = await Flashcard.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 })

    const total = await Flashcard.countDocuments(filter)

    res.json({
      flashcards,
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

export const getFlashcardById = async (req, res, next) => {
  try {
    const flashcard = await Flashcard.findOne({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' })
    }

    res.json({ flashcard })
  } catch (error) {
    next(error)
  }
}

export const updateFlashcard = async (req, res, next) => {
  try {
    const { masteryStatus, confidenceScore } = req.body

    const flashcard = await Flashcard.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        masteryStatus,
        confidenceScore,
        reviewCount: flashcard.reviewCount + 1
      },
      { new: true }
    )

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' })
    }

    res.json({
      message: 'Flashcard updated successfully',
      flashcard
    })
  } catch (error) {
    next(error)
  }
}

export const recordFlashcardAttempt = async (req, res, next) => {
  try {
    const { correct } = req.body

    const flashcard = await Flashcard.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        $inc: {
          reviewCount: 1,
          correctCount: correct ? 1 : 0
        }
      },
      { new: true }
    )

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' })
    }

    res.json({
      message: 'Attempt recorded',
      flashcard
    })
  } catch (error) {
    next(error)
  }
}

export const deleteFlashcard = async (req, res, next) => {
  try {
    const flashcard = await Flashcard.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' })
    }

    res.json({ message: 'Flashcard deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const getFlashcardsForReview = async (req, res, next) => {
  try {
    // Spaced repetition algorithm - return cards that are due for review
    const now = new Date()

    const flashcards = await Flashcard.find({
      userId: req.user.userId,
      nextReviewDate: { $lte: now }
    }).limit(20)

    res.json({
      flashcards,
      count: flashcards.length
    })
  } catch (error) {
    next(error)
  }
}

export default {
  generateFlashcardsFromUpload,
  getFlashcards,
  getFlashcardById,
  updateFlashcard,
  recordFlashcardAttempt,
  deleteFlashcard,
  getFlashcardsForReview
}
