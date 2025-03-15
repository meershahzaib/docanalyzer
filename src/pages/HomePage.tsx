import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Brain, Zap, Lock, Sparkles, ArrowRight, CheckCircle2, Star, Users, MessageSquare } from 'lucide-react';

function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="flex-1">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Documents with
            <span className="gradient-text block mt-2 shine">AI-Powered Analysis</span>
          </motion.h1>
          <motion.p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto" {...fadeIn}>
            Extract valuable insights, summaries, and knowledge from your documents using advanced AI technology.
          </motion.p>
          <motion.div {...fadeIn}>
            <Link
              to="/analyzer"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors button-glow"
            >
              Try It Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">Key Features</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <FileText className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Summarization</h3>
              <p className="text-gray-400">
                Get both concise bullet points and detailed summaries of your documents instantly.
              </p>
            </motion.div>
            
            {/* Other feature cards retained as originally implemented */}
            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Brain className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entity Recognition</h3>
              <p className="text-gray-400">
                Automatically identify and categorize key entities, names, and organizations.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-10 h-10 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Analysis</h3>
              <p className="text-gray-400">
                Process documents in seconds and get comprehensive insights immediately.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Lock className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
              <p className="text-gray-400">
                Your documents are processed securely and never stored on our servers.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced AI</h3>
              <p className="text-gray-400">
                Powered by state-of-the-art natural language processing models.
              </p>
            </motion.div>

            <motion.div
              className="feature-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageSquare className="w-10 h-10 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Q&amp;A</h3>
              <p className="text-gray-400">
                Ask questions about your documents and get instant, accurate answers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">How to Get Started</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="instruction-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold ml-4">Upload Document</h3>
              </div>
              <p className="text-gray-400">
                Simply paste your text into the analyzer or upload your document file.
              </p>
            </motion.div>

            <motion.div
              className="instruction-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold ml-4">Process Content</h3>
              </div>
              <p className="text-gray-400">
                Our AI will analyze your document and extract key information automatically.
              </p>
            </motion.div>

            <motion.div
              className="instruction-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold ml-4">Get Insights</h3>
              </div>
              <p className="text-gray-400">
                Review the comprehensive analysis and download your results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">What Our Users Say</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-400">Research Analyst</p>
                </div>
              </div>
              <p className="text-gray-300">
                "This tool has revolutionized how I process research papers. The insights are incredibly accurate and save me hours of work."
              </p>
              <div className="flex mt-4">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </div>
            </motion.div>

            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Smith</h4>
                  <p className="text-gray-400">Content Manager</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The summary feature is exceptional. It captures the essence of long documents perfectly while maintaining context."
              </p>
              <div className="flex mt-4">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </div>
            </motion.div>

            <motion.div
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-gray-400">Tech Lead</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The API integration was seamless, and the analysis results are consistently reliable. A must-have tool for our team."
              </p>
              <div className="flex mt-4">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
