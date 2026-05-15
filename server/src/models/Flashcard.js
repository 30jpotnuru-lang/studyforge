import mongoose from 'mongoose'

const flashcardSchema = new mongoose.Schema(
  {
    uploadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    hint: {
      type: String
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    topic: {
      type: String
    },
    tags: [{
      type: String
    }],
    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    },
    masteryStatus: {
      type: String,
      enum: ['learning', 'familiar', 'proficient', 'mastered'],
      default: 'learning'
    },
    nextReviewDate: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    correctCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Flashcard = mongoose.model('Flashcard', flashcardSchema)
export default Flashcard
