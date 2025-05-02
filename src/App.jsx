import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Header from './components/sections/Header';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import useScrollSpy from './hooks/useScrollSpy';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const { activeSection, showNavbar } = useScrollSpy(sections);

  useEffect(() => {
    // Favicon setup
    const setFavicon = () => {
      // Create new favicon link element
      const link = document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';
      link.href = '/logo.png';
      
      // Remove any existing favicon links
      const existingLinks = document.querySelectorAll("link[rel*='icon']");
      existingLinks.forEach(el => el.parentNode.removeChild(el));
      
      // Add the new favicon link to the document head
      document.head.appendChild(link);
      
      // Set page title
      document.title = "Biplab Karki | Portfolio";
    };
    
    setFavicon();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar activeSection={activeSection} showNavbar={showNavbar} />
        <Header scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}