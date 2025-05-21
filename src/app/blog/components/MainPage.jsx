"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return 'Invalid Date';
  }
}

export default function BlogPage({ allPosts }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Sort posts based on selected order
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
    // Implement popularity sorting if you have that data
    return 0;
  });

  // Filter posts by selected category
  const filteredPosts = selectedCategory === 'All' 
    ? sortedPosts 
    : sortedPosts.filter(post => post.category === selectedCategory);

  // Get all unique categories for filter
  const allCategories = ['All', ...new Set(allPosts.map(post => post.category))];

  // Group posts by category for category sections
  const postsByCategory = sortedPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});

  // Featured post (most recent)
  const featuredPost = sortedPosts[0];

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
      </div>
      
      {/* Blog Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-8 text-white">
          Blogs    
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover stories, thinking, and expertise from our writers on technology, design, and development.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto relative">
                {featuredPost.image && featuredPost.image.trim() !== '' ? (
                  <Image 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(featuredPost.date)}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900 hover:text-blue-600 transition duration-300">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:underline">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-200">
                      {featuredPost.author?.avatar && featuredPost.author.avatar.trim() !== '' ? (
                        <Image 
                          src={featuredPost.author.avatar} 
                          alt={featuredPost.author.name || 'Author'}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{featuredPost.author?.name || 'Anonymous'}</span>
                  </div>
                  <span className="text-sm text-gray-500">{featuredPost.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="inline-flex items-center flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="font-medium text-gray-700 text-sm">Filter by:</span>
          {allCategories.map(category => (
            <button 
              key={category} 
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <select 
            className=" border bg-blue-950/80  rounded-lg px-4 py-2 pl-4 pr-10  text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="popular">Sort by: Popular</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* No posts message */}
      {filteredPosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500">Try changing your filter or check back later for new content.</p>
        </div>
      )}

      {/* Blog posts grid for filtered view */}
      {selectedCategory !== 'All' && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* Blog posts by category for "All" view */}
      {selectedCategory === 'All' && Object.keys(postsByCategory).map(category => (
        <div key={category} className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{category}</h2>
            <Link 
              href={`/blog/category/${category.toLowerCase()}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline flex items-center"
            >
              View all
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsByCategory[category].slice(0, 3).map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      {filteredPosts.length > 9 && (
        <div className="mt-16">
          <div className="flex items-center justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                8
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                9
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Newsletter Subscription */}
      {/* <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p className="opacity-90">Get the latest articles, tutorials and updates delivered to your inbox.</p>
          </div>
          <div className="md:w-1/3">
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className="bg-white text-blue-600 font-medium px-4 py-3 rounded-lg hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}

// Post Card Component
function PostCard({ post }) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full group ">
      <div className="relative h-48 w-full overflow-hidden">
        {post.image && post.image.trim() !== '' ? (
          <Image 
            src={post.image} 
            alt={post.title}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{post.description}</p>
        
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-gray-200">
              {post.author?.avatar && post.author.avatar.trim() !== '' ? (
                <Image 
                  src={post.author.avatar} 
                  alt={post.author.name || 'Author'}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-800">{post.author?.name || 'Anonymous'}</span>
          </div>
          <span className="text-xs text-gray-500">{post.readingTime}</span>
        </div>
      </div>
    </article>
  );
}