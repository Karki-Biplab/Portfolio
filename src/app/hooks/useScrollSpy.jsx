"use client"
import { useState, useEffect, useRef } from 'react';

export default function useScrollSpy(sections, options = {}) {
  const [activeSection, setActiveSection] = useState('home');
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Set up intersection observer for scroll spy with better options
    const observer = new IntersectionObserver((entries) => {
      // Sort entries by intersection ratio and position
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => {
          // Prioritize entries with higher intersection ratio
          if (a.intersectionRatio !== b.intersectionRatio) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          // If ratios are equal, prioritize the one higher on the page
          return a.target.offsetTop - b.target.offsetTop;
        });

      if (visibleEntries.length > 0) {
        const newActiveSection = visibleEntries[0].target.id;
        console.log('ScrollSpy detected section:', newActiveSection);
        setActiveSection(newActiveSection);
      }
    }, { 
      threshold: [0.1, 0.3, 0.5, 0.7], // Multiple thresholds for better detection
      rootMargin: '-20% 0px -20% 0px', // Adjust when sections become "active"
      ...options.observerOptions 
    });
    
    // Alternative scroll-based detection as fallback
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Adjust detection point
      
      let currentSection = 'home';
      
      // Check sections from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const sectionTop = element.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        console.log('ScrollSpy fallback detected section:', currentSection);
        setActiveSection(currentSection);
      }
    };
    
    // Observe sections
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Section with id "${section}" not found`);
      }
    });

    // Handle navbar visibility on scroll
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Run scroll spy fallback
      handleScrollSpy();
      
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

    // Debounce scroll events for better performance
    let scrollTimeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    
    // Initial check
    handleScrollSpy();
    
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [sections, options.observerOptions, activeSection]);

  return { activeSection, showNavbar };
}