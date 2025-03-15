import React from 'react';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-slate-800 backdrop-blur-sm bg-slate-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 gradient-text">DocAnalyzer</h3>
            <p className="text-gray-400 mb-4">
              Transform your documents with AI-powered analysis and insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Features</a></li>
              <li><a href="#" className="footer-link">Pricing</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Documentation</a></li>
              <li><a href="#" className="footer-link">API Reference</a></li>
              <li><a href="#" className="footer-link">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@docanalyzer.com" className="footer-link">
                  <Mail className="w-4 h-4" />
                  <span>contact@docanalyzer.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="footer-link">
                  <Phone className="w-4 h-4" />
                  <span>+1 (234) 567-890</span>
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 DocAnalyzer. All rights reserved.
          </div>
          <div className="flex items-center text-gray-400">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by DocAnalyzer Team
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;