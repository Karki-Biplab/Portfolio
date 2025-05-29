import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import BlogShare from './BlogShare';
import './blog-post.css';

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false,
});

// Function to get all blog post slugs for static generation
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    console.warn('Blog content directory not found:', blogDir);
    return [];
  }
  
  try {
    const files = fs.readdirSync(blogDir);
    
    const params = files
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        try {
          const filePath = path.join(blogDir, filename);    
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);
          
          // Use slug from frontmatter if available, otherwise use filename
          const slug = data.slug || filename.replace('.md', '');
          
          console.log('Generated slug:', slug, 'from file:', filename);
          
          return {
            slug: slug,
          };
        } catch (error) {
          console.error(`Error parsing ${filename}:`, error);
          return {
            slug: filename.replace('.md', ''),
          };
        }
      })
      .filter(Boolean); // Remove any null/undefined entries
      
    console.log('All generated params:', params);
    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Function to generate metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const post = getPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
        description: 'The requested blog post could not be found',
      };
    }
    
    return {
      title: `${post.title} | My Blog`,
      description: post.description || post.excerpt || 'Blog post',
      keywords: post.tags?.join(', ') || '',
      openGraph: {
        title: post.title,
        description: post.description || post.excerpt || 'Blog post',
        type: 'article',
        publishedTime: post.date,
        url: `/blog/${slug}`,
        siteName: 'My Blog',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description || post.excerpt || 'Blog post',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }
}

// Function to get blog post by slug
function getPostBySlug(slug) {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    console.error('Blog content directory not found:', blogDir);
    return null;
  }
  
  try {
    const files = fs.readdirSync(blogDir);
    
    console.log('Looking for slug:', slug);
    console.log('Available files:', files);
    
    // Find matching file
    let postFile = null;
    
    for (const filename of files) {
      if (!filename.endsWith('.md')) continue;
      
      try {
        const filePath = path.join(blogDir, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        // Check both frontmatter slug and filename-based slug
        const frontmatterSlug = data.slug;
        const filenameSlug = filename.replace('.md', '');
        
        console.log(`File: ${filename}, frontmatter slug: ${frontmatterSlug}, filename slug: ${filenameSlug}`);
        
        if (frontmatterSlug === slug || filenameSlug === slug) {
          postFile = { path: filePath, contents: fileContents };
          console.log('Found matching post:', filename);
          break;
        }
      } catch (error) {
        console.error(`Error parsing frontmatter in ${filename}:`, error);
        continue;
      }
    }
    
    if (!postFile) {
      console.error('No matching post found for slug:', slug);
      return null;
    }
    
    // Parse the post content
    const { data, content } = matter(postFile.contents);
    
    // Generate excerpt if not provided
    let excerpt = data.excerpt || data.description;
    if (!excerpt && content) {
      // Extract first paragraph as excerpt
      const firstParagraph = content.split('\n\n')[0];
      excerpt = firstParagraph.replace(/[#*`]/g, '').trim();
      if (excerpt.length > 160) {
        excerpt = excerpt.substring(0, 160) + '...';
      }
    }
    
    // Extract headings for table of contents
    const headings = extractHeadings(content);
    
    const htmlContent = marked(content);
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      description: data.description || excerpt || 'No description provided',
      excerpt,
      author: data.author || { name: 'Unknown Author' },
      category: data.category || 'Uncategorized',
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      readingTime: calculateReadingTime(content),
      content: htmlContent,
      headings,
      published: data.published !== false, // Default to true unless explicitly false
      image: data.image || '',
    };
  } catch (error) {
    console.error('Error processing post content:', error);
    return null;
  }
}

// Extract headings from markdown content for table of contents
function extractHeadings(content) {
  const headingRegex = /^(#{1,6})\s+(.*$)/gim;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    headings.push({
      level,
      text,
      id,
    });
  }
  
  return headings;
}

// Calculate estimated reading time
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Format date with error handling
function formatDate(date) {
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Invalid Date';
  }
}

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
          <div className="mb-8">
            <Link href="/blog" className="group inline-flex items-center gap-3 text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:gap-4">
              <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="text-lg">Back to Blog</span>
            </Link>
          </div>

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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 mb-12">
                {/* Featured Image */}
                {post.image && post.image.trim() !== '' && (
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </div>
                )}
                
                {/* Header Content */}
                <div className="p-8 md:p-12">
                  {/* Category Badge */}
                  <div className="flex items-center mb-6">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full mr-4 shadow-lg">
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-sm">{formatDate(post.date)}</span>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Description */}
                  {post.description && post.description !== 'No description provided' && (
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  
                  {/* Author and Meta */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-2 ring-blue-400/50">
                        {post.author?.avatar && post.author.avatar.trim() !== '' ? (
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name || 'Author'}
                            className="w-full h-full object-cover"
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
                        <div className="font-bold text-white text-lg">
                          {typeof post.author === 'string' ? post.author : post.author?.name || 'Anonymous'}
                        </div>
                        <div className="text-gray-400">{post.readingTime}</div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-700/50 text-blue-400 text-sm px-3 py-1 rounded-full border border-gray-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Table of Contents */}
              <div className="lg:hidden mb-8">
                <TableOfContents headings={post.headings} mobile />
              </div>

              {/* Article Content */}
              <article className="blog-content bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-700/50 mb-12">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </article>

              {/* Share Section */}
              <div className="mb-12">
                <BlogShare post={post} currentUrl={currentUrl} />
              </div>

              {/* Navigation Footer */}
              <div className="text-center">
                <Link 
                  href="/blog"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>View All Posts</span>
                </Link>
              </div>
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