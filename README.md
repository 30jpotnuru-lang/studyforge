# StudyForge 🚀

**AI-Powered Study Platform** - Transform any study material into intelligent flashcards, quizzes, and personalized study sessions.

## 🎯 Vision

StudyForge combines the power of **Quizlet + Duolingo + Notion + ChatGPT** to create an extremely interactive, visually satisfying, and intelligent study platform. Students upload any study material, and AI automatically generates adaptive flashcards, quizzes, tests, and personalized study sessions.

## ✨ Key Features

### Core Features
- 🤖 **AI Flashcard Generation** - Automatic extraction of key concepts
- 📝 **Smart Quiz Generator** - Multiple formats (MC, short answer, matching, etc.)
- 🧠 **AI Tutor System** - Context-aware explanations and hints
- 📊 **Advanced Analytics** - Track progress, retention, weak spots
- 🎮 **Gamification** - XP, streaks, achievements, leaderboards

### Study Modes
- Standard Flashcard Mode
- Exam Mode (Timed Practice)
- Rapid Recall Mode
- Match Game
- Survival Mode
- AI Oral Quiz Mode
- Focus Study Timer
- Weakness Repair Mode

### Course Support
- **Mathematics**: Algebra, Geometry, Calculus, AP, SAT/ACT
- **Sciences**: Biology, Chemistry, Physics, AP courses
- **History & Social Studies**: World History, AP History, Economics
- **English & Languages**: ELA, Spanish, French, German, Mandarin, etc.
- **Computer Science**: AP CS, Programming, Web Dev
- **Test Prep**: SAT, ACT, PSAT, GRE

### File Support
- PDF, DOCX, TXT files
- Images with OCR
- Handwritten notes
- Typed text
- Lecture notes

## 🏗️ Tech Stack

### Frontend
- **React 18** + Vite
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **React Query** - Server state management

### Backend
- **Node.js** + Express
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **OpenAI API** (GPT-3.5-turbo)
- **Multer** - File uploads
- **pdf-parse** - PDF extraction
- **Mammoth** - DOCX parsing
- **Tesseract.js** - OCR
- **JWT** - Authentication

### Deployment
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database
- **Railway/Render** - Backend hosting

## 📁 Project Structure

```
studyforge/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # Context API
│   │   ├── services/      # API calls
│   │   ├── animations/    # Framer Motion configs
│   │   ├── styles/        # TailwindCSS & global styles
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── controllers/    # Route controllers
│   │   ├── models/        # MongoDB schemas
│   │   ├── middleware/    # Custom middleware
│   │   ├── services/      # Business logic
│   │   ├── ai/            # AI integration
│   │   ├── parsers/       # File parsers
│   │   ├── db/            # Database config
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configuration
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
│
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- OpenAI API key
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/30jpotnuru-lang/studyforge.git
cd studyforge

# Install dependencies
npm install

# Setup environment variables
cp server/.env.example server/.env
# Edit server/.env with your credentials

# Start development
npm run dev
```

### Environment Variables

**Server (.env)**
```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

**Client (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 Development Phases

### Phase 1: Foundation (Current)
- [ ] Landing page with animations
- [ ] Authentication system (signup/login/guest)
- [ ] File upload pipeline
- [ ] Dashboard with stats
- [ ] Basic database schema

### Phase 2: Core Features
- [ ] Flashcard generation engine
- [ ] Quiz generator (multiple formats)
- [ ] AI tutor chat system
- [ ] Study modes
- [ ] Analytics dashboard

### Phase 3: Advanced Features
- [ ] Gamification system (XP, streaks, achievements)
- [ ] Advanced analytics with charts
- [ ] Multiplayer study rooms
- [ ] Mobile app optimization
- [ ] Voice/speech features

### Phase 4: Polish & Scale
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] A/B testing
- [ ] User feedback implementation
- [ ] Scale infrastructure

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#0066FF)
- **Secondary**: Purple (#7C3AED)
- **Background**: Dark Slate (#0F172A)
- **Text**: White (#FFFFFF)
- **Accent**: Neon (#39FF14)

### Typography
- **Headlines**: 'Inter' or 'Sohne'
- **Body**: 'Inter'
- **Mono**: 'Fira Code'

### Components
- Glassmorphism containers
- Smooth transitions
- Floating panels
- Animated cards
- Interactive buttons
- Loading skeletons
- Empty states

## 📖 API Documentation

### Authentication
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

### Upload & Parsing
```
POST /api/upload
GET  /api/uploads/:id
DELETE /api/uploads/:id
```

### Flashcards
```
POST /api/flashcards/generate
GET  /api/flashcards
GET  /api/flashcards/:id
PUT  /api/flashcards/:id
DELETE /api/flashcards/:id
```

### Quizzes
```
POST /api/quizzes/generate
GET  /api/quizzes
POST /api/quizzes/:id/attempt
GET  /api/quizzes/:id/results
```

### AI Tutor
```
POST /api/ai-tutor/chat
GET  /api/ai-tutor/history
```

### Analytics
```
GET  /api/analytics/dashboard
GET  /api/analytics/progress
GET  /api/analytics/weak-areas
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run frontend tests
npm run test:client

# Run backend tests
npm run test:server
```

## 📦 Building & Deployment

### Frontend (Vercel)
```bash
npm run build:client
# Automatically deployed via Vercel
```

### Backend (Railway/Render)
```bash
npm run build:server
# Deploy via Git push
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

Design inspiration from:
- Linear
- Notion
- Arc Browser
- Apple
- Duolingo
- Stripe

## 📞 Support

For issues, questions, or suggestions, please open a GitHub issue.

---

**StudyForge** - Transform Learning Into an Art Form 🎨
