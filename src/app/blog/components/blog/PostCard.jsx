"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/app/blog/utils';

export function PostCard({ post, compact = false }) {
  return (
    <article className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full group border border-gray-700/50 hover:border-blue-500/50 hover:scale-[1.02] ${compact ? 'h-auto' : ''}`}>
      <div className={`relative ${compact ? 'h-40' : 'h-56'} w-full overflow-hidden`}>
        {post.image && post.image.trim() !== '' ? (
          <Image 
            src={post.image} 
            alt={post.title}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
            <svg className="w-12 h-12 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className={`p-6 flex flex-col flex-grow ${compact ? 'p-4' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400 font-medium">{formatDate(post.date)}</span>
          <span className="text-xs text-blue-400 font-medium">{post.readingTime}</span>
        </div>
        
        <h3 className={`font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-200 leading-tight ${compact ? 'text-lg' : 'text-xl'}`}>
          <Link href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-2">
            {post.title}
          </Link>
        </h3>
        
        <p className={`text-gray-300 mb-4 line-clamp-3 flex-grow leading-relaxed ${compact ? 'text-sm' : ''}`}>
          {post.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex items-center">
            <div className={`rounded-full overflow-hidden mr-3 ring-2 ring-blue-400/30 ${compact ? 'h-8 w-8' : 'h-10 w-10'}`}>
              {post.author?.avatar && post.author.avatar.trim() !== '' ? (
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name || 'Author'}
                  width={compact ? 32 : 40}
                  height={compact ? 32 : 40}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className={`text-white ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              )}
            </div>
            <span className={`font-medium text-gray-200 ${compact ? 'text-sm' : ''}`}>
              {post.author?.name || 'Anonymous'}
            </span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium hover:underline decoration-2 underline-offset-2"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}