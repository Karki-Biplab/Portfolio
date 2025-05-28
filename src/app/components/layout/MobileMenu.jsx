// MobileMenu.jsx - Updated with blog placement change
"use client"
import { Moon, Sun } from 'lucide-react';

export default function MobileMenu({ activeSection, theme, toggleTheme, scrollToSection, isOpen, onClose }) {
  const BlogHeader = () => {
    window.location.href = '/blog';
  };

  // Debug log to see what activeSection we're getting
  console.log('MobileMenu activeSection:', activeSection);

  const menuItems = ['about', 'skills', 'projects', 'blog', 'contact'];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sliding menu */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Navigation
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200 hover:scale-110"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col p-6 space-y-2 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 h-full">
          {/* Menu Items */}
          {menuItems.map((section, index) => {
            // Normalize both strings for comparison
            const normalizedActiveSection = activeSection?.toLowerCase().trim();
            const normalizedSection = section.toLowerCase().trim();
            const isActive = normalizedActiveSection === normalizedSection;
            
            console.log(`Comparing: "${normalizedActiveSection}" === "${normalizedSection}" = ${isActive}`);
            
            return (
              <button 
                key={section}
                onClick={() => {
                  console.log(`Clicking section: ${section}`);
                  if (section === 'blog') {
                    BlogHeader();
                  } else {
                    scrollToSection(section);
                  }
                  onClose();
                }} 
                className={`group relative text-left py-4 px-4 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:text-gray-900 dark:hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-white' : 'bg-blue-400 group-hover:bg-blue-500'
                  }`} />
                  <span className="capitalize tracking-wide">{section}</span>
                </div>
                {isActive && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            );
          })}
          
          {/* Theme toggle */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 hover:shadow-md transition-all duration-300">
              <span className="text-gray-700 dark:text-gray-300 font-medium">Theme</span>
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-md"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? 
                  <Moon size={20} className="text-blue-600" /> : 
                  <Sun size={20} className="text-yellow-500" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}