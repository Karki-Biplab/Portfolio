'use client';

import { useState, useEffect, useRef } from 'react';

export default function TableOfContents({ headings, mobile = false }) {
  const [activeId, setActiveId] = useState('');
  const [isExpanded, setIsExpanded] = useState(!mobile);
  const tocRef = useRef(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const addIdsToHeadings = () => {
      headings.forEach(heading => {
        const elements = document.querySelectorAll(`h${heading.level}`);
        elements.forEach(element => {
          if (element.textContent?.trim() === heading.text.trim() && !element.id) {
            element.id = heading.id;
            element.style.scrollMarginTop = '120px';
          }
        });
      });
    };

    const timer = setTimeout(addIdsToHeadings, 100);

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -66% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      let mostVisible = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          mostVisible = entry;
          highestRatio = entry.intersectionRatio;
        }
      });

      if (mostVisible) {
        const newActiveId = mostVisible.target.id;
        setActiveId(newActiveId);

        // Scroll the TOC to show the active item
        const tocElement = tocRef.current?.querySelector(`[data-id="${newActiveId}"]`);
        if (tocElement && tocRef.current) {
          const containerTop = tocRef.current.scrollTop;
          const containerHeight = tocRef.current.clientHeight;
          const elementTop = tocElement.offsetTop;
          const elementHeight = tocElement.clientHeight;

          // Scroll only if out of view
          if (
            elementTop < containerTop ||
            elementTop + elementHeight > containerTop + containerHeight
          ) {
            tocRef.current.scrollTo({
              top: elementTop - containerHeight / 2 + elementHeight / 2,
              behavior: 'smooth'
            });
          }
        }
      } else {
        const headingElements = headings
          .map(h => document.getElementById(h.id))
          .filter(Boolean);

        let closestElement = null;
        let smallestDistance = Infinity;

        headingElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);

          if (distance < smallestDistance && rect.top <= 200) {
            smallestDistance = distance;
            closestElement = element;
          }
        });

        if (closestElement) {
          setActiveId(closestElement.id);
        }
      }
    }, observerOptions);

    const observeHeadings = () => {
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    const observeTimer = setTimeout(observeHeadings, 200);

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveId('');
        return;
      }

      const headingElements = headings
        .map(h => document.getElementById(h.id))
        .filter(Boolean);

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const rect = element.getBoundingClientRect();

        if (rect.top <= 120) {
          setActiveId(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(observeTimer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });

      setActiveId(id);

      // Scroll TOC to show the active item
      const tocElement = tocRef.current?.querySelector(`[data-id="${id}"]`);
      if (tocElement && tocRef.current) {
        const containerTop = tocRef.current.scrollTop;
        const containerHeight = tocRef.current.clientHeight;
        const elementTop = tocElement.offsetTop;
        const elementHeight = tocElement.clientHeight;

        if (
          elementTop < containerTop ||
          elementTop + elementHeight > containerTop + containerHeight
        ) {
          tocRef.current.scrollTo({
            top: elementTop - containerHeight / 2 + elementHeight / 2,
            behavior: 'smooth'
          });
        }
      }
    }

    if (mobile) {
      setIsExpanded(false);
    }
  };

  if (!headings || headings.length === 0) {
    return null;
  }

  const tocContent = (
    <div className="space-y-1" ref={tocRef}>
      {headings.map((heading, index) => {
        const isActive = activeId === heading.id;
        const levelIndent = Math.max(0, heading.level - 1) * 12;

        return (
          <button
            key={index}
            data-id={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`
              block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 
              hover:bg-gray-700/50 group relative
              ${isActive
                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border-l-2 border-blue-400'
                : 'text-gray-400 hover:text-gray-200'
              }
            `}
            style={{ paddingLeft: `${12 + levelIndent}px` }}
          >
            <span className="flex items-center">
              {heading.level > 2 && (
                <span className="mr-2 text-gray-600 text-xs">
                  {'•'.repeat(Math.min(heading.level - 2, 3))}
                </span>
              )}
              <span className={`
                ${heading.level === 1 ? 'font-bold' :
                  heading.level === 2 ? 'font-semibold' :
                  'font-medium'
                }
              `}>
                {heading.text}
              </span>
            </span>

            {isActive && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-400 rounded-r-full"></div>
            )}
          </button>
        );
      })}
    </div>
  );

  if (mobile) {
    return (
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white">Table of Contents</h3>
              <p className="text-sm text-gray-400">
                {headings.length} section{headings.length !== 1 ? 's' : ''}
                {activeId && (
                  <span className="ml-2 text-blue-400">
                    • {headings.find(h => h.id === activeId)?.text}
                  </span>
                )}
              </p>
            </div>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-4 pb-4 border-t border-gray-700/50">
            <div className="pt-4">
              {tocContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-white">Table of Contents</h3>
          <p className="text-sm text-gray-400">
            {headings.length} section{headings.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <nav
        ref={tocRef}
        className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600"
      >
        {tocContent}
      </nav>

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex items-center text-xs text-gray-500">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
          <span>
            {activeId 
              ? `Reading: ${headings.find(h => h.id === activeId)?.text || 'Current section'}` 
              : 'Start reading'}
          </span>
        </div>
      </div>
    </div>
  );
}
