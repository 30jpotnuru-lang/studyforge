import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import connectDB from './db/connection.js'
import config from './config/index.js'
import errorHandler from './middleware/errorHandler.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import flashcardRoutes from './routes/flashcardRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import analyticsRoutes from './routes/analyticsRoutes.js'

const app = express()

// Connect to MongoDB
await connectDB()

// Middleware
app.use(helmet())
app.use(cors(config.cors))
app.use(morgan('dev'))
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/flashcards', flashcardRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/analytics', analyticsRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server
const PORT = config.port
app.listen(PORT, () => {
  console.log(`\n🚀 StudyForge Server Running on http://localhost:${PORT}`)
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`)
  console.log(`🌍 Environment: ${config.nodeEnv}\n`)
})

export default app
