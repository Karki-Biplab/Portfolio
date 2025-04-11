import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Code2, Database, Cpu, ExternalLink } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
    
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <nav className="fixed w-full bg-white dark:bg-gray-800 bg-opacity-90 text-gray-800 dark:text-white z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="text-xl font-bold hover:text-blue-400 transition-colors">
            BK
          </button>
          <div className="hidden md:flex space-x-6 items-center">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors">Skills</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">Projects</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
            <button onClick={toggleTheme} className="hover:text-yellow-400 transition-colors">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <header
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black text-white relative overflow-hidden pt-24"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-6 text-center z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Biplab Karki</h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Software Developer | Passionate about Real-World Projects
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View My Projects
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-5xl font-bold text-blue-500 dark:text-blue-300">BK</span>
              </div>
            </div>
            <div className="text-lg leading-relaxed space-y-6 dark:text-gray-300">
              <p>
                I am a passionate and self-motivated developer who thrives on learning through hands-on experience.
                I enjoy solving real-world problems, collaborating with like-minded individuals, and refining my
                skills through continuous learning.
              </p>
              <p>
                I'm currently pursuing a BSc (Hons) in Computer Science at Herald College Kathmandu. My academic
                foundation is complemented by several practical projects, ranging from mobile app development using
                Flutter & Firebase, to data science, machine learning, and IoT innovations.
              </p>
            </div>
            <div className="mt-8 text-center">
              <a href="/Biplab_Karki_Resume.pdf" download className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Programming & Web</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li>• Flutter, Firebase</li>
                <li>• Java, Python</li>
                <li>• HTML, CSS, JS</li>
                <li>• React, TypeScript</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Database & ML</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li>• MongoDB, MySQL</li>
                <li>• Scikit-learn, Numpy, Pandas</li>
                <li>• ANN, CNN, RNN, LSTM</li>
                <li>• Data Analysis & Visualization</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Cpu className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Tools & Platforms</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li>• Git & GitHub</li>
                <li>• Android Studio</li>
                <li>• Figma (UI Design)</li>
                <li>• IoT & Hardware Programming</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-1 transition-transform">
              <div className="h-48 bg-blue-900 mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">Inventory App</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Inventory Management App</h3>
              <p className="mb-4 dark:text-gray-300">Built using Flutter and Firebase, this solo FYP app helps manage store inventory effectively with real-time updates and barcode scanning.</p>
              <div className="flex gap-4">
                <a href="https://youtu.be/RnOXPPQZ5R8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <ExternalLink className="mr-2" size={16} /> Watch Demo
                </a>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-1 transition-transform">
              <div className="h-48 bg-blue-900 mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">Tour & Travel</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Tour & Travels Website</h3>
              <p className="mb-4 dark:text-gray-300">A group project focused on Nepali tourism. Handled frontend development and supported backend integration for booking system.</p>
              <div className="flex gap-4">
                <a href="https://travelsandtourz.000webhostapp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <ExternalLink className="mr-2" size={16} /> Visit Website
                </a>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-1 transition-transform">
              <div className="h-48 bg-blue-900 mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">ML Project</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Vegetable Classification & Sentiment Analysis</h3>
              <p className="dark:text-gray-300">Used deep learning models for image classification and NLP tools like RNN and LSTM for sentiment analysis on product reviews and user feedback.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg overflow-hidden transform hover:translate-y-1 transition-transform">
              <div className="h-48 bg-blue-900 mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">IoT Project</span>
              </div>
              <h3 className="text-xl font-bold mb-2">IoT Door Lock System</h3>
              <p className="mb-4 dark:text-gray-300">An IoT-based project that uses RFID for secure door access, built with microcontrollers and sensors for enhanced security.</p>
              <div className="flex gap-4">
                <a href="https://youtu.be/1vr0pS6GA6U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <ExternalLink className="mr-2" size={16} /> Watch Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Contact</h2>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-lg mb-8">Interested in collaborating or have an opportunity? Feel free to get in touch!</p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:Biplabkarki13@gmail.com" className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                <Mail className="mr-2" size={20} />Email Me
              </a>
            </div>
            <div className="text-gray-400 mt-8">
              <p>Based in Kathmandu, Nepal</p>
              <p className="mt-2">Available for remote opportunities worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Biplab Karki. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/Karki-Biplab" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
            <a href="https://linkedin.com/in/biplabkarki13" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;