"use client";

import Link from 'next/link';
import { useState } from 'react';
import { BlogHeader } from './blog/BlogHeader';
import { CategoryModal } from './blog/CategoryModal';
import { FeaturedPost } from './blog/FeaturedPost';
import { FilterControls } from './blog/FilterControls';
import { PostCard } from './blog/PostCard';
import { NoPosts } from './blog/NoPosts';
import { CategorySection } from './blog/CategorySection';

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

  // Group posts by category for category sections (only used for modal)
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

  const blogDescription = "Whether it's Tech, Server, Health, or Nature - If I'm curious, I'm writing it. This blog isn't limited to just code and tech. It's a space where I explore whatever grabs my attention. From late-night thoughts to deep dives into Development setups or the science behind real life, It's all here. Welcome to a place where tech meets thought, and everyday questions turn into stories worth sharing.";

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
        
        <BlogHeader blogDescription={blogDescription} />
        
        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <div className="flex items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <h2 className="text-3xl font-bold text-white">Featured Post</h2>
              </div>
            </div>
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        <FilterControls 
          allCategories={allCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {/* No posts message */}
        {filteredPosts.length === 0 && <NoPosts />}

        {/* Blog posts grid - shows for both "All" and specific categories */}
        {filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

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