"use client"
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import MobileMenu from './MobileMenu';
import Link from 'next/link';

export default function Navbar({ activeSection, showNavbar }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full bg-white dark:bg-gray-800 bg-opacity-90 text-gray-800 dark:text-white z-50 backdrop-blur-sm shadow-md transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover mr-2"
              loading="lazy"
              style={{ pointerEvents: 'none' }}
            />
            <span>Biplab</span>
          </button>
         
          {/* Desktop Navigation */}
         <div className="hidden md:flex space-x-6 items-center">
    {['about', 'skills', 'projects', 'blog', 'contact'].map(section => (
      section === 'blog' ? (
        <Link 
          key={section} 
          href="/blog" 
          className={`hover:text-blue-500 transition-colors capitalize ${activeSection === section ? 'text-blue-500 font-medium' : ''}`}
        >
          {section}
        </Link>
      ) : (
        <button 
          key={section}
          onClick={() => scrollToSection(section)} 
          className={`hover:text-blue-500 transition-colors capitalize ${activeSection === section ? 'text-blue-500 font-medium' : ''}`}
        >
          {section}
        </button>
      )
    ))}
    
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  </div>
          
          {/* Mobile menu button */}
          <button 
            className={`md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile menu - now rendered outside the nav */}
      <MobileMenu 
        activeSection={activeSection} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        scrollToSection={scrollToSection}
        isOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}