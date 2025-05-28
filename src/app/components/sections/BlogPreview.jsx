"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function BlogPreview() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="blog" className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold mb-4 relative">
            My Blogs
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Where Curiosity Meets Words
          </p>
        </div>

        {/* Blog Description */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 mb-8">
            <div className="flex flex-col items-center">
              {/* Icon - Centered */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Driven by Curiosity
                </h3>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  My Blogs reflects my Curious Mind. I write about Servers, Tech, Hardware, Nature, Health - 
                  basically anything that sparks my Interest and might spark yours too.
                </p>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  From programming tutorials to wellness thoughts, it's an eclectic mix that's authentic to who I am 
                  as a developer and person.
                </p>
              </div>
            </div>
          </div>

          {/* Button - Outside the box on desktop, centered */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl text-base"
            >
              <span>View All Posts</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}