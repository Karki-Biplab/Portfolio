import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Globe, Server, Cpu, Shield } from 'lucide-react';

function App() {
  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900 bg-opacity-90 text-white z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold hover:text-blue-300 transition-colors"
            >
              JD
            </button>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="hover:text-blue-300 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('skills')}
                className="hover:text-blue-300 transition-colors"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="hover:text-blue-300 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="hover:text-blue-300 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">John Developer</h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-8">Full Stack Developer & System Architect</p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/johndeveloper" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-blue-300 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/johndeveloper" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-blue-300 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:john@developer.com" 
              className="text-white hover:text-blue-300 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">About Me</h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80" 
                alt="John Developer"
                className="w-48 h-48 rounded-full mx-auto mb-8 object-cover shadow-lg"
              />
            </div>
            <div className="text-lg text-gray-600 leading-relaxed space-y-6">
              <p>
                Hello! I'm John, a passionate Full Stack Developer based in San Francisco with over 8 years of experience 
                in building enterprise-scale applications. I specialize in creating efficient, scalable, and maintainable 
                solutions that solve real-world problems.
              </p>
              <p>
                My journey in software development began at Stanford University, where I earned my BS in Computer Science. 
                Since then, I've worked with various startups and Fortune 500 companies, helping them build and scale their 
                digital products.
              </p>
              <p>
                Currently, I'm working as a Senior Software Engineer at TechCorp, where I lead the development of our 
                cloud-native microservices architecture. When I'm not coding, you can find me contributing to open-source 
                projects, writing technical blog posts, or mentoring aspiring developers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Code2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• React & Next.js</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Redux & React Query</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Server className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Backend Development</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Node.js & Express</li>
                <li>• Python & FastAPI</li>
                <li>• Java Spring Boot</li>
                <li>• GraphQL</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Database className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Database Design</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• PostgreSQL</li>
                <li>• MongoDB</li>
                <li>• Redis</li>
                <li>• Database Optimization</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Cloud Services</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• AWS (Certified)</li>
                <li>• Azure</li>
                <li>• Google Cloud</li>
                <li>• Serverless Architecture</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Cpu className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">DevOps</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Docker & Kubernetes</li>
                <li>• CI/CD Pipelines</li>
                <li>• Infrastructure as Code</li>
                <li>• Monitoring & Logging</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Security</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• OAuth & JWT</li>
                <li>• OWASP Security</li>
                <li>• Encryption</li>
                <li>• Security Auditing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                alt="E-Commerce Platform" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">E-Commerce Platform</h3>
                <p className="text-gray-600 mb-4">
                  A scalable e-commerce platform handling 100K+ monthly users. Built with React, Node.js, and PostgreSQL.
                  Features include real-time inventory, AI-powered recommendations, and integrated payment processing.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/johndeveloper/ecommerce-platform" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Github className="mr-2" size={16} /> Code
                  </a>
                  <a 
                    href="https://ecommerce-demo.johndeveloper.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="mr-2" size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
                alt="Cloud Management Dashboard" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Cloud Management Dashboard</h3>
                <p className="text-gray-600 mb-4">
                  A modern dashboard for managing multi-cloud infrastructure. Features real-time monitoring, cost optimization,
                  and automated scaling policies. Built with Next.js, GraphQL, and D3.js for visualizations.
                </p>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/johndeveloper/cloud-dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Github className="mr-2" size={16} /> Code
                  </a>
                  <a 
                    href="https://cloud-demo.johndeveloper.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="mr-2" size={16} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Get In Touch</h2>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-lg mb-8">
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="mailto:john@developer.com"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Mail className="mr-2" size={20} />
                  Email Me
                </a>
                <a 
                  href="https://calendly.com/johndeveloper/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
            <div className="text-center text-gray-400">
              <p className="mb-2">Based in San Francisco, CA</p>
              <p>Available for remote work worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 John Developer. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="https://github.com/johndeveloper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Github
              </a>
              <a 
                href="https://linkedin.com/in/johndeveloper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com/johndeveloper" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;