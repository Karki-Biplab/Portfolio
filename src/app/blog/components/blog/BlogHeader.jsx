"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function BlogHeader({ blogDescription }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const glowVariants = {
    initial: {
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
    },
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(147, 51, 234, 0.4)",
        "0 0 60px rgba(236, 72, 153, 0.5)",
        "0 0 40px rgba(147, 51, 234, 0.4)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Generate deterministic positions using a simple seeded random function
  const generateDeterministicPositions = () => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      // Use a simple seeded approach for consistent positioning
      const seed = i * 123.456; // Multiplier to spread values
      const left = (seed % 100);
      const top = ((seed * 1.618) % 100); // Using golden ratio for variation
      const duration = 2 + ((seed * 2.345) % 3); // Duration between 2-5 seconds
      const delay = (seed * 0.789) % 2; // Delay between 0-2 seconds
      
      positions.push({
        left: `${left}%`,
        top: `${top}%`,
        duration,
        delay
      });
    }
    return positions;
  };

  const floatingElements = generateDeterministicPositions();

  return (
    <div className="text-center mb-20 relative">
      {/* Floating background elements - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
              animate={{
                y: [-20, -100, -20],
                x: [0, (i % 2 === 0 ? 50 : -50), 0], // Deterministic x movement
                scale: [0.5, 1, 0.5],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay
              }}
              style={{
                left: element.left,
                top: element.top
              }}
            />
          ))}
        </div>
      )}

      {/* Title with letter-by-letter animation */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="relative mb-16"
      >
        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {"My Blogs".split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              whileHover={{ 
                scale: 1.2, 
                rotateY: 180,
                transition: { duration: 0.3 }
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
        
        {/* Glowing underline */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>

      {/* Description */}
      <motion.div
        className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
      >
        <motion.p
          className="p-6 rounded-xl backdrop-blur-sm text-center"
          whileHover={{ 
            scale: 1.01,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            transition: { duration: 0.3 }
          }}
          style={{
            background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)`
          }}
        >
          {blogDescription}
        </motion.p>
      </motion.div>
    </div>
  );
}