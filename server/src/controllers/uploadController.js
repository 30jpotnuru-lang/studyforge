import Upload from '../models/Upload.js'
import { parseFile } from '../utils/fileParser.js'
import { detectSubject } from '../services/aiService.js'

export const handleFileUpload = async (req, res, next) => {
  try {
    const { file } = req
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const upload = new Upload({
      userId: req.user.userId,
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      status: 'processing'
    })

    await upload.save()

    // Extract text asynchronously
    setImmediate(async () => {
      try {
        const extractedText = await parseFile(file.path, file.mimetype)
        const subject = await detectSubject(extractedText)

        upload.extractedText = extractedText
        upload.subject = subject
        upload.status = 'completed'
        await upload.save()
      } catch (error) {
        upload.status = 'failed'
        upload.processingError = error.message
        await upload.save()
      }
    })

    res.status(201).json({
      message: 'File uploaded successfully',
      upload: upload
    })
  } catch (error) {
    next(error)
  }
}

export const getUploads = async (req, res, next) => {
  try {
    const uploads = await Upload.find({ userId: req.user.userId }).sort({ createdAt: -1 })
    res.json({ uploads })
  } catch (error) {
    next(error)
  }
}

export const getUploadById = async (req, res, next) => {
  try {
    const upload = await Upload.findOne({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' })
    }

    res.json({ upload })
  } catch (error) {
    next(error)
  }
}

export const deleteUpload = async (req, res, next) => {
  try {
    const upload = await Upload.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    })

    if (!upload) {
      return res.status(404).json({ message: 'Upload not found' })
    }

    res.json({ message: 'Upload deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export default { handleFileUpload, getUploads, getUploadById, deleteUpload }
