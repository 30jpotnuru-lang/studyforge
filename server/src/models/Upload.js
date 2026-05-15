import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    extractedText: {
      type: String
    },
    subject: {
      type: String,
      enum: ['Mathematics', 'Science', 'Biology', 'Chemistry', 'Physics', 'English', 'History', 'Geography', 'Computer Science', 'SAT/PSAT', 'Languages', 'Custom'],
      default: 'Custom'
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    processingError: {
      type: String
    }
  },
  { timestamps: true }
)

const Upload = mongoose.model('Upload', uploadSchema)
export default Upload
