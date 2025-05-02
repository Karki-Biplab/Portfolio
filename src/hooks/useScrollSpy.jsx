import { useState, useEffect, useRef } from 'react';

export default function useScrollSpy(sections, options = {}) {
  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Set up intersection observer for scroll spy
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.6, ...options.observerOptions });
    
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    // Handle navbar visibility on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide navbar after scrolling past header
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide navbar
          setShowNavbar(false);
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
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, options.observerOptions]);

  return { activeSection, showNavbar };
}