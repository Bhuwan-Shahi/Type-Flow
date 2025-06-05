import { motion } from "framer-motion";
import { Keyboard, Trophy, TrendingUp, Github, Twitter, Linkedin, Settings, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import StatisticsCards from "@/components/statistics-cards";
import TestConfig from "@/components/test-config";
import TypingInterface from "@/components/typing-interface";
import ResultsModal from "@/components/results-modal";
import PersonalRecords from "@/components/personal-records";
import { useTypingTest } from "@/hooks/use-typing-test";

export default function TypingTest() {
  const typingTest = useTypingTest();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Keyboard className="text-white text-lg" size={20} />
              </div>
              <span className="text-xl font-bold text-neutral-800">TypeFlow</span>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-neutral-500 hover:text-neutral-800 transition-colors">Dashboard</Link>
              <Link href="/statistics" className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center space-x-1">
                <BarChart3 size={16} />
                <span>Statistics</span>
              </Link>
              <Link href="/settings" className="text-neutral-500 hover:text-neutral-800 transition-colors flex items-center space-x-1">
                <Settings size={16} />
                <span>Settings</span>
              </Link>
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                Sign In
              </button>
            </nav>
            
            <button className="md:hidden p-2 text-neutral-500 hover:text-neutral-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-neutral-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Master Your Typing Speed
            </motion.h1>
            <motion.p 
              className="text-xl text-neutral-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Professional typing test with real-time feedback and detailed analytics
            </motion.p>
          </div>
        </section>

        {/* Statistics Cards */}
        <motion.section 
          className="px-4 sm:px-6 lg:px-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatisticsCards {...typingTest} />
        </motion.section>

        {/* Test Configuration */}
        <motion.section 
          className="px-4 sm:px-6 lg:px-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TestConfig {...typingTest} />
        </motion.section>

        {/* Typing Interface */}
        <motion.section 
          className="px-4 sm:px-6 lg:px-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TypingInterface {...typingTest} />
        </motion.section>

        {/* Personal Records */}
        <motion.section 
          className="px-4 sm:px-6 lg:px-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <PersonalRecords />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Keyboard className="text-white text-lg" size={20} />
                </div>
                <span className="text-xl font-bold">TypeFlow</span>
              </div>
              <p className="text-neutral-400 mb-4 max-w-md">
                The professional typing test tool designed for speed, accuracy, and continuous improvement.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Real-time WPM</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accuracy Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Multiple Modes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Progress Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 TypeFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Results Modal */}
      <ResultsModal {...typingTest} />
    </div>
  );
}
