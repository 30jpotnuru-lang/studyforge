import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studyTime: {
      type: Number,
      default: 0
    },
    flashcardsReviewed: {
      type: Number,
      default: 0
    },
    averageAccuracy: {
      type: Number,
      default: 0
    },
    strongTopics: [String],
    weakTopics: [String],
    dailyActivity: [{
      date: Date,
      timeSpent: Number,
      flashcardsReviewed: Number,
      quizzesTaken: Number
    }],
    subjectProgress: [{
      subject: String,
      cardsLearned: Number,
      masteredCards: Number,
      accuracy: Number
    }]
  },
  { timestamps: true }
)

const Analytics = mongoose.model('Analytics', analyticsSchema)
export default Analytics
