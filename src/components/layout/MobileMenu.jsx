import { Moon, Sun } from 'lucide-react';

export default function MobileMenu({ activeSection, theme, toggleTheme, scrollToSection }) {
  return (
    <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 shadow-lg">
      <div className="flex flex-col space-y-4">
        {['about', 'skills', 'projects', 'contact'].map(section => (
          <button 
            key={section}
            onClick={() => scrollToSection(section)} 
            className={`hover:text-blue-500 transition-colors capitalize py-2 ${activeSection === section ? 'text-blue-500 font-medium' : ''}`}
          >
            {section}
          </button>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
          <span>Toggle Theme</span>
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}