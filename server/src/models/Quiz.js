import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    questions: [{
      type: {
        type: String,
        enum: ['multiple-choice', 'short-answer', 'long-answer', 'matching', 'true-false', 'fill-blank'],
        required: true
      },
      question: String,
      options: [String],
      correctAnswer: String,
      explanation: String,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
      }
    }],
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'adaptive'],
      default: 'medium'
    },
    timeLimit: {
      type: Number
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    }
  },
  { timestamps: true }
)

const Quiz = mongoose.model('Quiz', quizSchema)
export default Quiz
