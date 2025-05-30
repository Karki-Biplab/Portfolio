import { notFound } from 'next/navigation';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import BlogShare from './BlogShare';
import BackToBlogButton from './components/BackToBlogButton';
import BlogHeroSection from './components/BlogHeroSection';
import BlogArticleContent from './components/BlogArticleContent';
import BlogNavigationFooter from './components/BlogNavigationFooter';
import { generateStaticParams, generateMetadata, getPostBySlug } from './components/utils';
import './blog-post.css';

// Export the utility functions
export { generateStaticParams, generateMetadata };

export default function BlogPost({ params }) {
  const { slug } = params;
  
  console.log('BlogPost component - received slug:', slug);
  
  try {
    const post = getPostBySlug(slug);
    
    if (!post) {
      console.log('Post not found, calling notFound()');
      notFound();
    }
    
    // Don't show unpublished posts in production
    if (!post.published && process.env.NODE_ENV === 'production') {
      console.log('Post is not published, calling notFound()');
      notFound();
    }
    
    // Construct the current URL for sharing
    const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://biplabkarki.com.np'}/blog/${slug}`;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <ReadingProgress />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back to Blog Button */}
          <BackToBlogButton />

          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-8">
                <TableOfContents headings={post.headings} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Hero Section */}
              <BlogHeroSection post={post} />

              {/* Mobile Table of Contents */}
              <div className="lg:hidden mb-8">
                <TableOfContents headings={post.headings} mobile />
              </div>

              {/* Article Content */}
              <BlogArticleContent post={post} />

              {/* Share Section */}
              <div className="mb-12">
                <BlogShare post={post} currentUrl={currentUrl} />
              </div>

              {/* Navigation Footer */}
              <BlogNavigationFooter />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    notFound();
  }
}