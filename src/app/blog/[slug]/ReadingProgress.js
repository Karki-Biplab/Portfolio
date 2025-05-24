'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('.blog-content');
      
      if (!article) return;
      
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const articleBottom = articleTop + articleHeight;
      const windowBottom = scrollTop + windowHeight;
      
      let newProgress = 0;
      if (scrollTop > articleTop) {
        newProgress = Math.min(100, ((windowBottom - articleTop) / articleHeight) * 100);
      }
      
      setProgress(newProgress);
    };

    // Set initial progress
    updateProgress();
    
    // Add event listeners
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div className="reading-progress">
      <div 
        className="reading-progress-bar" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}