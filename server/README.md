# StudyForge Backend API

AI-powered study platform backend built with Express.js and MongoDB.

## Setup

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Uploads
- `POST /api/upload/upload` - Upload study material
- `GET /api/upload/uploads` - Get all uploads
- `GET /api/upload/uploads/:id` - Get upload details
- `DELETE /api/upload/uploads/:id` - Delete upload

### Flashcards
- `POST /api/flashcards/generate` - Generate flashcards from upload
- `GET /api/flashcards` - Get all flashcards
- `GET /api/flashcards/review` - Get cards due for review
- `GET /api/flashcards/:id` - Get flashcard details
- `PUT /api/flashcards/:id` - Update flashcard
- `POST /api/flashcards/:id/attempt` - Record attempt
- `DELETE /api/flashcards/:id` - Delete flashcard

### Quizzes
- `POST /api/quizzes/generate` - Generate quiz from upload
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/submit` - Submit quiz attempt
- `GET /api/quizzes/:quizId/attempts` - Get quiz attempts

### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/progress` - User progress
- `GET /api/analytics/weak-areas` - Weak topics

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- OpenAI API
- JWT Authentication
- Multer for file uploads
- pdf-parse, mammoth for document parsing

## Features

✅ User authentication with JWT
✅ File upload and parsing (PDF, DOCX, TXT, Images)
✅ AI-powered flashcard generation
✅ AI-powered quiz generation
✅ Spaced repetition algorithm
✅ Quiz attempt tracking
✅ Analytics and progress tracking
✅ Error handling and validation

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
npm test       # Run tests
```
