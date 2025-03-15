import React, { useState, DragEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  Users,
  Brain,
  MessageSquareMore,
  Lightbulb,
  FilePenLine,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import OpenAI from 'openai';
import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source to point to the worker file in your public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

// Initialize OpenAI client (replace the API key with your own)
const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true // For production, consider handling API calls on the server side.
});

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
  const [fileContent, setFileContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to extract text from PDF
  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      if (!fullText.trim()) {
        throw new Error("No text could be extracted from the PDF.");
      }

      return fullText;
    } catch (err) {
      console.error('PDF extraction error:', err);
      throw new Error(`Failed to extract text from PDF: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Function to extract text from TXT file
  const extractTextFromTxt = async (file: File): Promise<string> => {
    try {
      const text = await file.text();
      if (!text.trim()) {
        throw new Error("The text file appears to be empty.");
      }
      return text;
    } catch (err) {
      console.error('Text extraction error:', err);
      throw new Error(`Failed to read text file: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Function to analyze text using OpenAI API
  const analyzeTextWithOpenAI = async (text: string): Promise<Analysis> => {
    try {
      // Trim text if it's too long (OpenAI has token limits)
      const trimmedText = text.length > 15000 ? text.substring(0, 15000) + "..." : text;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Switched to GPT-3.5-turbo for compatibility
        messages: [
          {
            role: "system",
            content: "You are a document analysis assistant. Analyze the following document and provide a structured analysis including summary, entities, topics, potential questions and answers, and key insights. Output in JSON format."
          },
          {
            role: "user",
            content: `Analyze this document: ${trimmedText}`
          }
        ],
        response_format: { type: "json_object" }
      });

      if (!response.choices[0].message.content) {
        throw new Error("Received empty response from OpenAI API");
      }

      const content = response.choices[0].message.content;
      console.log("OpenAI Response:", content);
      const parsedContent = JSON.parse(content);

      // Map OpenAI response to our Analysis interface
      return {
        summary: {
          brief: parsedContent.summary?.brief || [],
          detailed: parsedContent.summary?.detailed || "No detailed summary provided.",
        },
        entities: parsedContent.entities || [],
        topics: parsedContent.topics || [],
        qa: parsedContent.qa || [],
        insights: parsedContent.insights || [],
      };
    } catch (err) {
      console.error('OpenAI analysis error:', err);
      throw new Error(`Failed to analyze document: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const analyzeDocument = async () => {
    if (!file) {
      toast.error('Please upload a document to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    const toastId = toast.loading('Analyzing your document...');

    try {
      // Extract text based on file type
      let extractedText = '';
      if (file.type === 'application/pdf') {
        toast.loading('Extracting text from PDF...', { id: toastId });
        extractedText = await extractTextFromPdf(file);
      } else if (file.type === 'text/plain') {
        toast.loading('Reading text file...', { id: toastId });
        extractedText = await extractTextFromTxt(file);
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or text file.');
      }

      setFileContent(extractedText);

      // Analyze text with OpenAI
      toast.loading('Processing with AI...', { id: toastId });
      const analysisResult = await analyzeTextWithOpenAI(extractedText);

      setAnalysis(analysisResult);
      toast.success('Analysis completed successfully!', { id: toastId });
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error(`Analysis failed: ${errorMessage}`, { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'text/plain') {
        setFile(selectedFile);
        setAnalysis(null);
        setError(null);
        toast.success(`File "${selectedFile.name}" selected`);
      } else {
        toast.error('Please select a PDF or text file');
      }
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
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain') {
        setFile(droppedFile);
        setAnalysis(null);
        setError(null);
        toast.success(`File "${droppedFile.name}" dropped`);
      } else {
        toast.error('Please drop a PDF or text file');
      }
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
          Powered by OpenAI for advanced document analysis
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
          className={`w-full h-40 sm:h-[9.4rem] flex items-center justify-center border-2 rounded-lg transition-colors cursor-pointer ${isDragging
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-dashed border-slate-700 bg-slate-800/50'
            }`}
        >
          {file ? (
            <div className="text-center">
              <p className="text-white text-2xl flex items-center justify-center">
                <FilePenLine className="mr-2 h-6 w-6 text-blue-400" />
                <span className="font-semibold">{file.name}</span>
              </p>
              <p className="text-gray-400 text-base mt-2">
                {file.type === 'application/pdf' ? 'PDF Document' : 'Text File'} • {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-2xl">
              Drag &amp; drop your file here, or click to select
            </p>
          )}
        </motion.div>
        <input
          type="file"
          accept=".txt,.pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </motion.div>

      <button
        onClick={analyzeDocument}
        disabled={!file || isAnalyzing}
        className="mb-10 w-full sm:w-[60%] bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-2xl flex items-center justify-center"
      >
        {isAnalyzing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          'Analyze Document'
        )}
      </button>

      {/* Error Message */}
      {error && (
        <motion.div
          className="w-full sm:w-[60%] mb-8 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertCircle className="w-6 h-6 text-red-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-red-400 font-medium text-xl">Analysis Failed</h3>
            <p className="text-gray-300">{error}</p>
          </div>
        </motion.div>
      )}

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
