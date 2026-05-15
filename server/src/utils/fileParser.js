import pdf from 'pdf-parse'
import mammoth from 'mammoth'
import fs from 'fs'

export const extractFromPDF = async (filePath) => {
  const fileBuffer = fs.readFileSync(filePath)
  const data = await pdf(fileBuffer)
  return data.text
}

export const extractFromDOCX = async (filePath) => {
  const fileBuffer = fs.readFileSync(filePath)
  const result = await mammoth.extractRawText({ buffer: fileBuffer })
  return result.value
}

export const extractFromTXT = async (filePath) => {
  return fs.readFileSync(filePath, 'utf-8')
}

export const parseFile = async (filePath, mimetype) => {
  try {
    if (mimetype === 'application/pdf') {
      return await extractFromPDF(filePath)
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return await extractFromDOCX(filePath)
    } else if (mimetype === 'text/plain') {
      return await extractFromTXT(filePath)
    }
    throw new Error('Unsupported file type')
  } catch (error) {
    console.error('File parsing error:', error)
    throw error
  }
}

export default { parseFile, extractFromPDF, extractFromDOCX, extractFromTXT }
