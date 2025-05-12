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
  {/* Primary Meta Tags */}
  <title>Biplab Karki | Software Developer & Machine Learning Engineer</title>
  <meta name="title" content="Biplab Karki | Software Developer & Machine Learning Engineer" />
  <meta name="description" content="Innovative software developer specializing in web technologies, machine learning, and IoT solutions. Transforming ideas into cutting-edge digital experiences." />
  
  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://biplabkarki.com.np/" />
  <meta property="og:title" content="Biplab Karki - Technology Innovator" />
  <meta property="og:description" content="Expert in software development, machine learning, and IoT. Creating innovative technological solutions." />
  <meta property="og:image" content="https://biplabkarki.com.np/og-image.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://biplabkarki.com.np/" />
  <meta name="twitter:title" content="Biplab Karki | Tech Portfolio" />
  <meta name="twitter:description" content="Software developer crafting innovative solutions in web, ML, and IoT technologies." />
  <meta name="twitter:image" content="https://biplabkarki.com.np/twitter-image.png" />

  {/* Additional SEO-Focused Meta Tags */}
  <meta name="keywords" content="Biplab Karki, Software Developer, Machine Learning, Web Development, IoT, Full Stack Developer, Technology Innovator, React Developer, Next.js" />
  <meta name="author" content="Biplab Karki" />
  
  {/* Canonical Link */}
  <link rel="canonical" href="https://biplabkarki.com.np/" />

  {/* Viewport and Compatibility */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="theme-color" content="#1E40AF" />

  {/* Robots Meta Tag */}
  <meta name="robots" content="index, follow" />

  {/* Geo Tags (Optional - can be customized) */}
  <meta name="geo.region" content="NP" />
  <meta name="geo.placename" content="Nepal" />

  {/* Structured Data - JSON-LD */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Biplab Karki",
      "jobTitle": "Software Developer",
      "knowsAbout": [
        "Web Development",
        "Machine Learning",
        "Internet of Things",
        "React",
        "Next.js"
      ],
      "url": "https://biplabkarki.com.np/",
      "sameAs": [
        "https://www.linkedin.com/in/biplabkarki13/",
        "https://github.com/karki-biplab"
      ]
    })}
  </script>
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