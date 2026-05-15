import User from '../models/User.js'
import { hashPassword, comparePassword, generateToken } from '../utils/auth.js'

export const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name
    })

    await user.save()

    // Generate token
    const token = generateToken(user._id, user.email)

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = generateToken(user._id, user.email)

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      xp: user.xp,
      level: user.level,
      streak: user.streak
    })
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const { name, subject, preferences } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, subject, preferences },
      { new: true }
    )

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subject: user.subject
      }
    })
  } catch (error) {
    next(error)
  }
}

export default { signup, login, getProfile, updateProfile }
