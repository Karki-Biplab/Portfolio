"use client"

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
import Head from 'next/head';

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
    <>
      <Head>
        <title>Biplab Karki | Portfolio</title>
        <meta name="description" content="Portfolio of Biplab Karki - Software Developer, Machine Learning Enthusiast, and IoT Innovator" />
        <meta name="keywords" content="Biplab Karki, Software Developer, Machine Learning, IoT, Portfolio, Web Development" />
        <meta name="author" content="Biplab Karki" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-portfolio-url.com/" />
        <meta property="og:title" content="Biplab Karki | Portfolio" />
        <meta property="og:description" content="Software Developer, Machine Learning Enthusiast, and IoT Innovator" />
        <meta property="og:image" content="/gitprof.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://your-portfolio-url.com/" />
        <meta property="twitter:title" content="Biplab Karki | Portfolio" />
        <meta property="twitter:description" content="Software Developer, Machine Learning Enthusiast, and IoT Innovator" />
        <meta property="twitter:image" content="/gitprof.png" />
        
        {/* Viewport and other common meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1E40AF" />
      </Head>

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
    </>
  );
}