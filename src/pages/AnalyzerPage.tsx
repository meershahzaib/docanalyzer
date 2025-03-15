import React, { useState } from 'react';
import { Book, FileText, Users, Brain, MessageSquareMore, Lightbulb } from 'lucide-react';
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

function AnalyzerPage() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to analyze');
      return;
    }

    setIsAnalyzing(true);
    toast.loading('Analyzing your document...', { id: 'analyzing' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setAnalysis({
        summary: {
          brief: [
            'Advanced AI technology discussion',
            'Focus on neural networks',
            'Applications in modern computing'
          ],
          detailed: 'The document provides a comprehensive overview of artificial intelligence developments, particularly focusing on neural network architectures and their practical applications in modern computing environments.'
        },
        entities: [
          {
            category: 'Technologies',
            items: ['Neural Networks', 'Deep Learning', 'Machine Learning']
          },
          {
            category: 'Organizations',
            items: ['Google AI', 'OpenAI', 'DeepMind']
          }
        ],
        topics: [
          {
            name: 'AI Architecture',
            description: 'Discussion of various neural network architectures and their implementations'
          },
          {
            name: 'Applications',
            description: 'Real-world applications of AI in different industries'
          }
        ],
        qa: [
          {
            question: 'What are the main AI technologies discussed?',
            answer: 'The main technologies discussed are neural networks, deep learning, and their applications in modern computing systems.'
          },
          {
            question: 'Which organizations are mentioned?',
            answer: 'The document mentions Google AI, OpenAI, and DeepMind as key organizations in the field.'
          }
        ],
        insights: [
          'Strong emphasis on practical applications',
          'Focus on scalability and performance',
          'Consideration of ethical implications'
        ]
      });

      toast.success('Analysis completed successfully!', { id: 'analyzing' });
    } catch (error) {
      toast.error('Failed to analyze document. Please try again.', { id: 'analyzing' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold">Input Document</h2>
          </div>
          <textarea
            className="w-full h-64 p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Paste your document text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={analyzeText}
            disabled={isAnalyzing || !text.trim()}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
          </button>
        </div>

        <div className="space-y-6">
          {analysis && (
            <>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <Book className="w-6 h-6 text-green-400 mr-2" />
                  <h2 className="text-xl font-semibold">Summary</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-300 mb-2">Key Points:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {analysis.summary.brief.map((point, index) => (
                        <li key={index} className="text-gray-400">{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-300 mb-2">Detailed Summary:</h3>
                    <p className="text-gray-400">{analysis.summary.detailed}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-purple-400 mr-2" />
                  <h2 className="text-xl font-semibold">Key Entities</h2>
                </div>
                {analysis.entities.map((category, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h3 className="font-medium text-gray-300 mb-2">{category.category}:</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-700/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-orange-400 mr-2" />
                  <h2 className="text-xl font-semibold">Key Topics</h2>
                </div>
                <div className="space-y-4">
                  {analysis.topics.map((topic, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-300">{topic.name}</h3>
                      <p className="text-gray-400">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <MessageSquareMore className="w-6 h-6 text-indigo-400 mr-2" />
                  <h2 className="text-xl font-semibold">Q&A</h2>
                </div>
                <div className="space-y-4">
                  {analysis.qa.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-300">{item.question}</h3>
                      <p className="text-gray-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mr-2" />
                  <h2 className="text-xl font-semibold">Additional Insights</h2>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="text-gray-400">{insight}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default AnalyzerPage;