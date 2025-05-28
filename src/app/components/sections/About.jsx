"use client"
import { useState, useEffect } from 'react';

export default function About() {
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle resize and scroll events to control button visibility
  useEffect(() => {
    // Check screen size
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Check for overlapping elements on scroll
    const handleScroll = () => {
      // Get the position where overlapping might occur
      // This is usually at the bottom of the page near the contact or footer section
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;
      
      // Hide button when near the bottom of the page (last 300px)
      // Adjust this value depending on your layout
      if (pageHeight - scrollPosition < 300) {
        setIsButtonVisible(false);
      } else {
        setIsButtonVisible(true);
      }
    };

    // Initial check
    handleResize();
    handleScroll();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          About Me
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 flex justify-center">
           <img 
            src="/profile.png"
            alt="Biplab Karki"
            className="w-48 h-48 rounded-full shadow-xl object-cover transform hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-blue-600 duration-300 ease-in-out"
            loading="lazy"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ pointerEvents: 'none' }}
          />
          </div>
          <div className="text-base sm:text-lg leading-relaxed space-y-6 dark:text-gray-300">

            <p>
              I am a passionate and self-motivated developer who thrives on learning through hands-on experience.
              I enjoy solving real-world problems, collaborating with like-minded individuals, and refining my
              skills through continuous learning.
            </p>
            <p>
              I've completed pursuing a BSc (Hons) in Computer Science at Herald College Kathmandu. My academic
              foundation was complemented by several practical projects, ranging from mobile app development using
              Flutter & Firebase, to data science, machine learning, and IoT innovations.
            </p>
            <p>
              My goal is to create technological solutions that make a positive impact on people's lives
              while continuously expanding my technical expertise across various domains.
            </p>
          </div>
          
          {/* Download Button - Responsive and Conditional */}
          {isButtonVisible && (
            <div 
              className={`
                fixed z-50 transition-all duration-300 ease-in-out
                ${isSmallScreen ? 'right-4 bottom-4' : 'right-6 bottom-10'}
                ${!isButtonVisible ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-bounce'}
              `}
            >
              <a 
                href="/Biplab_Karki_Resume.pdf" 
                download 
                className="
                  group flex items-center justify-center
                  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold 
                  rounded-lg shadow-lg hover:shadow-xl
                  transition-all duration-300
                  px-3 py-2 md:px-5 md:py-3
                  text-sm md:text-base
                  border-2 border-transparent hover:border-blue-400
                "

              >
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <span className={`transition-all duration-300 ${isSmallScreen ? 'w-0 overflow-hidden' : 'w-auto'}`}>
                  {isSmallScreen ? '' : 'Download Resume'}
                </span>
                <span className={`transition-all duration-300 ${isSmallScreen ? 'inline' : 'hidden'}`}>CV</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}