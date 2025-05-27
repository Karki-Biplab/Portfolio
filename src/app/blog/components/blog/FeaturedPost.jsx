"use client";

import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/app/blog/utils';

export function FeaturedPost({ post }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
      <div className="md:flex">
        <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
          {post.image && post.image.trim() !== '' ? (
            <Image 
              src={post.image}
              alt={post.title}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full mr-4 shadow-lg">
              {post.category}
            </span>
            <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight group-hover:text-blue-400 transition-colors duration-300">
            <Link href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
              {post.title}
            </Link>
          </h3>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed line-clamp-3">
            {post.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-400/50">
                {post.author?.avatar && post.author.avatar.trim() !== '' ? (
                  <Image 
                    src={post.author.avatar} 
                    alt={post.author.name || 'Author'}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <div className="font-bold text-white">{post.author?.name || 'Anonymous'}</div>
                <div className="text-gray-400 text-sm">{post.readingTime}</div>
              </div>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}