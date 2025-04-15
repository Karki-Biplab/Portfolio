import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, Code2, Database, Cpu, ExternalLink } from 'lucide-react';

export default function BiplabPortfolio() {
  const [theme, setTheme] = useState('light');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
    
    // Trigger animation after component mounts
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Set up intersection observer for scroll spy
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.6 });
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    // Add scroll event listener for hiding navbar
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide navbar after scrolling past header
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar
          setShowNavbar(false);
          // Close mobile menu when navbar hides
          setMobileMenuOpen(false);
        } else {
          // Scrolling up - show navbar
          setShowNavbar(true);
        }
      } else {
        // At top of page - always show navbar
        setShowNavbar(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Favicon setup
    const setFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = '/logo.png'; // Path to your favicon in public folder
      document.getElementsByTagName('head')[0].appendChild(link);
      
      // Set page title
      document.title = "Biplab Karki | Portfolio";
    };
    
    setFavicon();
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full bg-white dark:bg-gray-800 bg-opacity-90 text-gray-800 dark:text-white z-50 backdrop-blur-sm shadow-md transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              BK
            </div>
            <span>Biplab</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {['about', 'skills', 'projects', 'contact'].map(section => (
              <button 
                key={section}
                onClick={() => scrollToSection(section)} 
                className={`hover:text-blue-500 transition-colors capitalize ${activeSection === section ? 'text-blue-500 font-medium' : ''}`}
              >
                {section}
              </button>
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
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
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
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
        )}
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-black text-white relative overflow-hidden pt-24"
      >
        <div className="absolute inset-0">
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
        </div>
        
        <div className="container mx-auto px-6 text-center z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6 flex justify-center">
              <img src="/profile.png" alt="Biplab Karki" className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors transform hover:scale-105"
              >
                View My Projects
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            About Me
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 flex justify-center">
              {/* Using image from public folder instead of initials */}
              <img src="/profile.png" alt="Biplab Karki" className="w-48 h-48 rounded-full shadow-xl object-cover transform hover:scale-105 transition-transform" />
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
              <p>
                My goal is to create technological solutions that make a positive impact on people's lives
                while continuously expanding my technical expertise across various domains.
              </p>
            </div>
            <div className="mt-10 text-center">
              <a 
                href="/Biplab_Karki_Resume.pdf" 
                download 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            Skills & Tools
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Programming & Web</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Flutter, Firebase
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Java, Python
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  HTML, CSS, JavaScript
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  React, TypeScript
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Responsive Design
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Database & ML</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  MongoDB, MySQL
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Scikit-learn, NumPy, Pandas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  ANN, CNN, RNN, LSTM
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Data Analysis & Visualization
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Natural Language Processing
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Cpu className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Tools & Platforms</h3>
              <ul className="space-y-2 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Git & GitHub
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Android Studio
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Figma (UI Design)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  IoT & Hardware Programming
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Docker & Cloud Services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            Projects
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Project 1 */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group">
              <div className="h-52 relative overflow-hidden">
                <img src="/project1.png" alt="Inventory App" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href="https://youtu.be/RnOXPPQZ5R8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Watch Demo
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Inventory Management App</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">Flutter</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">Firebase</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">FYP</span>
                </div>
                <p className="mb-4 dark:text-gray-300">Built using Flutter and Firebase, this solo Final Year Project app helps manage store inventory effectively with real-time updates and barcode scanning.</p>
                <div className="flex gap-4">
                  <a href="https://youtu.be/RnOXPPQZ5R8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <ExternalLink className="mr-2" size={16} /> View Demo
                  </a>
                </div>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group">
              <div className="h-52 relative overflow-hidden">
                <img src="/project2.png" alt="Tour & Travel" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href="https://travelsandtourz.000webhostapp.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Visit Website
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tour & Travels Website</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">HTML/CSS</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">JavaScript</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">PHP</span>
                </div>
                <p className="mb-4 dark:text-gray-300">A group project focused on Nepali tourism. Handled frontend development and supported backend integration for the booking system.</p>
                <div className="flex gap-4">
                  <a href="https://travelsandtourz.000webhostapp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <ExternalLink className="mr-2" size={16} /> Visit Website
                  </a>
                </div>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group">
              <div className="h-52 relative overflow-hidden">
                <img src="/project3.png" alt="ML Project" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vegetable Classification & Sentiment Analysis</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">Python</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">TensorFlow</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">NLP</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">CNN</span>
                </div>
                <p className="dark:text-gray-300">Used deep learning models for image classification and NLP tools like RNN and LSTM for sentiment analysis on product reviews and user feedback.</p>
              </div>
            </div>
            
            {/* Project 4 */}
            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group">
              <div className="h-52 relative overflow-hidden">
                <img src="/project4.png" alt="IoT Project" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <a 
                    href="https://youtu.be/1vr0pS6GA6U" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Watch Demo
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">IoT Door Lock System</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">Arduino</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">RFID</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">IoT</span>
                </div>
                <p className="mb-4 dark:text-gray-300">An IoT-based project that uses RFID for secure door access, built with microcontrollers and sensors for enhanced security.</p>
                <div className="flex gap-4">
                  <a href="https://youtu.be/1vr0pS6GA6U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    <ExternalLink className="mr-2" size={16} /> Watch Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            Contact
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-lg mb-8">Interested in collaborating or have an opportunity? Feel free to get in touch!</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:Biplabkarki13@gmail.com" 
                className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:scale-105"
              >
                <Mail className="mr-2" size={20} />Email Me
              </a>
            </div>
            <div className="text-blue-200 mt-10">
              <p>Based in Kathmandu, Nepal</p>
              <p className="mt-2">Available for remote opportunities worldwide</p>
              <p className="mt-4 font-medium">Let's build something amazing together!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2">
              BK
            </div>
            <span className="font-medium">Biplab Karki</span>
            </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Biplab Karki. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/Karki-Biplab" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/biplabkarki13" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:Biplabkarki13@gmail.com" className="hover:text-blue-400 transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
