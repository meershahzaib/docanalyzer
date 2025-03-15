import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Brain, Book, FileText, Info, ChevronDown, Settings, HelpCircle } from 'lucide-react';

function Navbar() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold gradient-text">DocAnalyzer</span>
          </NavLink>
          <div className="flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? 'active' : ''}`}>
              <Book className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/analyzer" className={({ isActive }) => `nav-link flex items-center space-x-1 ${isActive ? 'active' : ''}`}>
              <FileText className="w-4 h-4" />
              <span>Analyzer</span>
            </NavLink>
            <div className="relative">
              <button
                className="nav-link flex items-center space-x-1"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <Info className="w-4 h-4" />
                <span>Resources</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isResourcesOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700/50 py-2"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-700/50 text-gray-300 hover:text-white">
                    <Settings className="w-4 h-4" />
                    <span>Documentation</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-700/50 text-gray-300 hover:text-white">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help Center</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;