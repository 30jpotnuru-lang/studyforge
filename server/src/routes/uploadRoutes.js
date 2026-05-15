import express from 'express'
import { handleFileUpload, getUploads, getUploadById, deleteUpload } from '../controllers/uploadController.js'
import authMiddleware from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadDir = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ]
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})

const router = express.Router()

router.post('/upload', authMiddleware, upload.single('file'), handleFileUpload)
router.get('/uploads', authMiddleware, getUploads)
router.get('/uploads/:id', authMiddleware, getUploadById)
router.delete('/uploads/:id', authMiddleware, deleteUpload)

export default router
