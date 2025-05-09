import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Header({ scrollToSection }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);
  
  return (
    <header
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-black text-white relative overflow-hidden pt-24"
    >
      <d  iv className="absolute inset-0">
        {/* Enhanced background with animated pattern */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 opacity-20">
          {Array(20).fill().map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-blue-500" 
              style={{
                width: Math.random() * 300 + 50 + 'px',
                height: Math.random() * 300 + 50 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.3,
                transform: `scale(${Math.random() * 0.6 + 0.4})`,
              }}
            ></div>
          ))}
        </div>
      </d>
      
      <div className="container mx-auto px-6 text-center z-10">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6 flex justify-center">
            <img src="/gitprof.png" alt="Biplab Karki" className="w-32 h-32 rounded-full border-4 border-white hover:scale-[1.05] duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-600   " />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Biplab Karki</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Software Developer | Machine Learning Enthusiast | IoT Innovator
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/Karki-Biplab" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/biplabkarki13" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:Biplabkarki13@gmail.com" className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <div className="mt-12">
            <button 
              onClick={() => scrollToSection('projects')} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors transform hover:scale-105 animate-bounce duration-300"
            >
              View My Projects
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}