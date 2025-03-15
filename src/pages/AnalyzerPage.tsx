import React, { useState, DragEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  Users,
  Brain,
  MessageSquareMore,
  Lightbulb,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Analysis {
  summary: {
    brief: string[];
    detailed: string;
  };
  entities: {
    category: string;
    items: string[];
  }[];
  topics: {
    name: string;
    description: string;
  }[];
  qa: {
    question: string;
    answer: string;
  }[];
  insights: string[];
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const dropZoneVariants = {
  hover: { scale: 1.03, borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.2)' },
  tap: { scale: 0.98 },
};

function AnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeDocument = async () => {
    if (!file) {
      toast.error('Please upload a document to analyze');
      return;
    }
    setIsAnalyzing(true);
    toast.loading('Analyzing your document...', { id: 'analyzing' });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setAnalysis({
        summary: {
          brief: [
            'Advanced AI technology discussion',
            'Focus on neural networks',
            'Applications in modern computing',
          ],
          detailed:
            'The document provides a comprehensive overview of artificial intelligence developments, focusing on neural network architectures and their practical applications in modern computing environments.',
        },
        entities: [
          {
            category: 'Technologies',
            items: ['Neural Networks', 'Deep Learning', 'Machine Learning'],
          },
          {
            category: 'Organizations',
            items: ['Google AI', 'OpenAI', 'DeepMind'],
          },
        ],
        topics: [
          {
            name: 'AI Architecture',
            description:
              'Discussion of various neural network architectures and their implementations',
          },
          {
            name: 'Applications',
            description: 'Real-world applications of AI in different industries',
          },
        ],
        qa: [
          {
            question: 'What are the main AI technologies discussed?',
            answer:
              'The document discusses neural networks, deep learning, and their modern applications.',
          },
          {
            question: 'Which organizations are mentioned?',
            answer:
              'Google AI, OpenAI, and DeepMind are highlighted as leaders in the field.',
          },
        ],
        insights: [
          'Strong emphasis on practical applications',
          'Focus on scalability and performance',
          'Consideration of ethical implications',
        ],
      });

      toast.success('Analysis completed successfully!', { id: 'analyzing' });
    } catch (error) {
      toast.error('Failed to analyze document. Please try again.', { id: 'analyzing' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.main
      className="w-full max-w-screen-xl mx-auto px-4 py-8 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-2">AI Document Analyzer</h1>
        <p className="text-gray-400 text-2xl">
          Powered by advanced AI systems delivering cutting-edge insights.
        </p>
      </div>

      {/* Upload Document Section */}
      <motion.div
        className="w-full sm:w-[60%] mx-auto mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label className="block text-2xl mb-4 text-center">
          Upload your document (text or PDF)
        </label>
        <motion.div
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          variants={dropZoneVariants}
          whileHover="hover"
          whileTap="tap"
          className={`w-full h-40 sm:h-[9.4rem] flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-dashed border-slate-700 bg-slate-800/50'
          }`}
        >
          {file ? (
            <p className="text-white text-2xl">
              <span className="font-semibold">{file.name}</span> selected.
            </p>
          ) : (
            <p className="text-gray-400 text-2xl">
              Drag &amp; drop your file here, or click to select
            </p>
          )}
        </motion.div>
        <input
          type="file"
          accept=".txt, .pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </motion.div>

      <button
        onClick={analyzeDocument}
        disabled={!file || isAnalyzing}
        className="mb-10 w-full sm:w-[60%] bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-2xl"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
      </button>

      {/* Analysis Results */}
      {analysis && (
        <div className="w-full space-y-8">
          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
            variants={containerVariants}
          >
            <div className="flex items-center mb-4">
              <Book className="w-8 h-8 text-green-400 mr-3" />
              <h2 className="text-3xl font-semibold">Summary</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-300 mb-2 text-2xl">Key Points:</h3>
                <ul className="list-disc list-inside space-y-1 text-xl">
                  {analysis.summary.brief.map((point, index) => (
                    <li key={index} className="text-gray-400">{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-300 mb-2 text-2xl">Detailed Summary:</h3>
                <p className="text-gray-400 text-xl">{analysis.summary.detailed}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
            variants={containerVariants}
          >
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl font-semibold">Key Entities</h2>
            </div>
            {analysis.entities.map((category, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="font-medium text-gray-300 mb-2 text-2xl">{category.category}:</h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item, itemIndex) => (
                    <span
                      key={itemIndex}
                      className="px-4 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xl border border-purple-700/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
            variants={containerVariants}
          >
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-orange-400 mr-3" />
              <h2 className="text-3xl font-semibold">Key Topics</h2>
            </div>
            <div className="space-y-4">
              {analysis.topics.map((topic, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-300 text-2xl">{topic.name}</h3>
                  <p className="text-gray-400 text-xl">{topic.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
            variants={containerVariants}
          >
            <div className="flex items-center mb-4">
              <MessageSquareMore className="w-8 h-8 text-indigo-400 mr-3" />
              <h2 className="text-3xl font-semibold">Q&amp;A</h2>
            </div>
            <div className="space-y-4">
              {analysis.qa.map((item, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-300 text-2xl">{item.question}</h3>
                  <p className="text-gray-400 text-xl">{item.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8"
            variants={containerVariants}
          >
            <div className="flex items-center mb-4">
              <Lightbulb className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-3xl font-semibold">Additional Insights</h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-xl">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="text-gray-400">{insight}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </motion.main>
  );
}

export default AnalyzerPage;
