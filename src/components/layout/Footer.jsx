import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full object-cover mr-2" />
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
  );
}