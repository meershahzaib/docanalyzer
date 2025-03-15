import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  Brain,
  Book,
  FileText,
  Info,
  ChevronDown,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';

function Navbar() {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsResourcesOpen(false);
  };

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[99999] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={closeMobileMenu}
      ></div>
      {/* Side Panel from the right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-slate-900 p-4 shadow-md transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={closeMobileMenu}
          className="mb-4 text-gray-300 focus:outline-none"
        >
          <X className="w-6 h-6" />
        </button>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white ${
                isActive ? 'font-bold' : ''
              }`
            }
          >
            <Book className="w-5 h-5" />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/analyzer"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `flex items-center space-x-2 text-gray-300 hover:text-white ${
                isActive ? 'font-bold' : ''
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span>Analyzer</span>
          </NavLink>
          <div className="flex flex-col">
            <button
              onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
            >
              <Info className="w-5 h-5" />
              <span>Resources</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            {isResourcesOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  <Settings className="w-5 h-5" />
                  <span>Documentation</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Help Center</span>
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <nav className="border-b border-slate-800 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold gradient-text">DocAnalyzer</span>
          </NavLink>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link flex items-center space-x-1 ${isActive ? 'active' : ''}`
              }
            >
              <Book className="w-4 h-4" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/analyzer"
              className={({ isActive }) =>
                `nav-link flex items-center space-x-1 ${isActive ? 'active' : ''}`
              }
            >
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
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-700/50 text-gray-300 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Documentation</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-700/50 text-gray-300 hover:text-white"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>Help Center</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {createPortal(mobileMenu, document.body)}
    </>
  );
}

export default Navbar;
