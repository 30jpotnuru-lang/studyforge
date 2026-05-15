import mongoose from 'mongoose'

const quizAttemptSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answers: [{
      questionIndex: Number,
      userAnswer: String,
      isCorrect: Boolean,
      timeSpent: Number
    }],
    score: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    correctAnswers: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    timeSpent: {
      type: Number
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema)
export default QuizAttempt
