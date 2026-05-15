import express from 'express'
import { signup, login, getProfile, updateProfile } from '../controllers/authController.js'
import { signupValidation, loginValidation } from '../middleware/validation.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)
router.get('/me', authMiddleware, getProfile)
router.put('/profile', authMiddleware, updateProfile)

export default router
