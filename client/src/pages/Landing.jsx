import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: '📚',
      title: 'AI Flashcards',
      description: 'Automatically extract key concepts and generate smart flashcards with spaced repetition.'
    },
    {
      icon: '✍️',
      title: 'Smart Quiz Generator',
      description: 'Create multiple choice, short answer, matching, and fill-in-the-blank questions instantly.'
    },
    {
      icon: '🧠',
      title: 'AI Tutor',
      description: 'Get personalized explanations, hints, and step-by-step guidance from your AI tutor.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Track your progress, identify weak areas, and optimize your study sessions.'
    },
    {
      icon: '🎮',
      title: 'Gamification',
      description: 'Earn XP, unlock achievements, and maintain daily study streaks.'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Study anywhere with full mobile support and offline mode.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-900 to-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold gradient-text">StudyForge</div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-white hover:text-primary-500 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-6">
              <Sparkles size={16} className="text-primary-500" />
              <span className="text-sm text-primary-300">Powered by AI</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Turn Any Study Guide Into an
              <span className="gradient-text block">AI Study System</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Upload your notes, textbooks, or study guides. Watch as AI instantly generates flashcards, quizzes, and personalized study sessions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2">
                Start Learning Free
                <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary inline-flex items-center gap-2">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-glass hover:border-primary-500/50 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Study Habits?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students using StudyForge to ace their exams.
          </p>
          <Link to="/signup" className="btn-primary inline-block">
            Start Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          <p>&copy; 2026 StudyForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
