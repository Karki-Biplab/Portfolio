import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe, Server, Cpu, Shield } from 'lucide-react';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed w-full bg-gray-900 bg-opacity-90 text-white z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('home')} className="text-xl font-bold hover:text-blue-300 transition-colors">
              BK
            </button>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-300 transition-colors">About</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-blue-300 transition-colors">Skills</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-blue-300 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-300 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </nav>

      <header id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black text-white relative overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)'
          }}></div>
        </div>
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Biplab Karki</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">Aspiring Software Developer | Passionate about Real-World Projects</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/Karki-Biplab" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/biplabkarki13" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:Biplabkarki13@gmail.com" className="text-white hover:text-blue-300 transition-colors">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed space-y-6">
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
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Programming & Web</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Flutter, Firebase</li>
                <li>• Java, Python</li>
                <li>• HTML, CSS, JS</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Database & ML</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• MongoDB, MySQL</li>
                <li>• Scikit-learn, Numpy, Pandas</li>
                <li>• ANN, CNN, RNN, LSTM</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Cpu className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tools & Platforms</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Git & GitHub</li>
                <li>• Android Studio</li>
                <li>• Figma (UI Design)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Inventory Management App</h3>
              <p className="text-gray-600 mb-4">Built using Flutter and Firebase, this solo FYP app helps manage store inventory effectively.</p>
              <a href="https://youtu.be/RnOXPPQZ5R8" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Watch Demo</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Tour & Travels Website</h3>
              <p className="text-gray-600 mb-4">A group project focused on Nepali tourism. Handled frontend and supported backend development.</p>
              <a href="https://travelsandtourz.000webhostapp.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visit Website</a>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Vegetable Classification & Sentiment Analysis</h3>
              <p className="text-gray-600">Used deep learning models for image classification and NLP tools like RNN and LSTM for sentiment analysis.</p>
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
            <div className="text-gray-400 mt-4">
              <p>Based in Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 Biplab Karki. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/Karki-Biplab" target="_blank" rel="noopener noreferrer" className="hover:text-white">Github</a>
            <a href="https://linkedin.com/in/biplabkarki13" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
