"use client";

import Link from 'next/link';
import { PostCard } from './PostCard';

export function CategorySection({ category, posts, openCategoryModal }) {
  return (
    <div key={category} className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-4"></div>
          {category}
          <span className="ml-3 text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
            {posts.length}
          </span>
        </h2>
        <button 
          onClick={() => openCategoryModal(category)}
          className="group flex items-center text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:gap-3 gap-2"
        >
          <span>View All</span>
          <div className="p-1 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}