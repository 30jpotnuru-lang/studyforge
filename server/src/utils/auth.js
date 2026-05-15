import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    config.jwtSecret,
    { expiresIn: '7d' }
  )
}

export default { hashPassword, comparePassword, generateToken }
