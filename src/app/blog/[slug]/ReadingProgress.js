'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Look for the article content using multiple selectors
      const article = 
  document.querySelector('.blog-content') || 
  document.querySelector('article') || 
  document.querySelector('.prose');
      
      if (!article) {
        console.log('Article element not found for reading progress');
        return;
      }
      
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate progress based on how much of the article has been scrolled past
      let newProgress = 0;
      
      if (scrollTop >= articleTop) {
        const scrolledPastArticleTop = scrollTop - articleTop;
        const articleScrollableHeight = Math.max(articleHeight - windowHeight, 1);
        newProgress = Math.min(100, (scrolledPastArticleTop / articleScrollableHeight) * 100);
      }
      
      // Smooth the progress a bit
      setProgress(Math.max(0, newProgress));
    };

    // Set initial progress
    const initialUpdate = () => {
      setTimeout(updateProgress, 100); // Give DOM time to render
    };
    
    initialUpdate();
    
    // Add event listeners with passive flag for better performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    // Update progress when DOM changes (useful for dynamic content)
    const observer = new MutationObserver(() => {
      setTimeout(updateProgress, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50"
      style={{ height: '3px' }}
    >
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
        style={{ 
          width: `${progress}%`,
        }}
      />
    </div>
  );
}