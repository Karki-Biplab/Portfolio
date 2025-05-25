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

// Category Modal Component
function CategoryModal({ isOpen, onClose, category, posts }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mr-3">
              {posts.length}
            </span>
            {category} Posts
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage({ allPosts }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [modalCategory, setModalCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort posts based on selected order
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
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

  const openCategoryModal = (category) => {
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsModalOpen(false);
    setModalCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Portfolio Button */}
        <div className="mb-8">
          <Link href="/" className="group inline-flex items-center gap-3 text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:gap-4">
            <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            <span className="text-lg">Back to Portfolio</span>
          </Link>
        </div>
        
        {/* Blog Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover stories, insights, and expertise on technology, design, and development. 
            Join me on this journey of continuous learning and innovation.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <h2 className="text-3xl font-bold text-white">Featured Post</h2>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="md:flex">
                <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
                  {featuredPost.image && featuredPost.image.trim() !== '' ? (
                    <Image 
                      src={featuredPost.image}
                      alt={featuredPost.title}
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
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-400 text-sm">{formatDate(featuredPost.date)}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight group-hover:text-blue-400 transition-colors duration-300">
                    <Link href={`/blog/${featuredPost.slug}`} className="hover:underline decoration-2 underline-offset-4">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-400/50">
                        {featuredPost.author?.avatar && featuredPost.author.avatar.trim() !== '' ? (
                          <Image 
                            src={featuredPost.author.avatar} 
                            alt={featuredPost.author.name || 'Author'}
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
                        <div className="font-bold text-white">{featuredPost.author?.name || 'Anonymous'}</div>
                        <div className="text-gray-400 text-sm">{featuredPost.readingTime}</div>
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${featuredPost.slug}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
          <div className="flex items-center flex-wrap gap-3">
            <span className="font-semibold text-gray-300 text-lg">Explore:</span>
            {allCategories.map(category => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-600 hover:border-gray-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <select 
              className="bg-gray-800/70 border border-gray-600 rounded-xl px-6 py-3 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/70 transition-colors min-w-[200px]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="oldest">Sort by: Oldest First</option>
              <option value="popular">Sort by: Most Popular</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* No posts message */}
        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-800/50 rounded-full p-6 mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No posts found</h3>
            <p className="text-gray-400 text-lg">Try adjusting your filters or check back later for fresh content.</p>
          </div>
        )}

        {/* Blog posts grid for filtered view */}
        {selectedCategory !== 'All' && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Blog posts by category for "All" view */}
        {selectedCategory === 'All' && Object.keys(postsByCategory).map(category => (
          <div key={category} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full mr-4"></div>
                {category}
                <span className="ml-3 text-sm bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full">
                  {postsByCategory[category].length}
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
              {postsByCategory[category].slice(0, 3).map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ))}

        {/* Category Modal */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={closeCategoryModal}
          category={modalCategory}
          posts={modalCategory ? postsByCategory[modalCategory] || [] : []}
        />
      </div>
    </div>
  );
}

// Post Card Component
function PostCard({ post, compact = false }) {
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