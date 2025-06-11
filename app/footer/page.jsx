import React from 'react';
import { FaHeart } from 'react-icons/fa'; // For a nicer heart icon

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-400 border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          {/* Copyright */}
          <p className="text-sm">
            © {currentYear} Octo-Profile. All rights reserved.
          </p>

          {/* Attribution */}
          <p className="text-sm flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1.5" aria-label="love" /> by 
            <a
              href="https://github.com/RO35ERT"
              target="_blank"
              rel="noopener noreferrer" // 'noopener' is generally recommended with 'noreferrer'
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
            >
              Robert
            </a>
          </p>
        </div>


        <div className="mt-6 pt-6 border-t border-gray-700 text-center md:text-left">
          <ul className="flex flex-col md:flex-row justify-center md:justify-start gap-x-6 gap-y-2">
            <li><a href="/privacy" className="hover:text-gray-200 text-xs">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-200 text-xs">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;