import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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
export function getPostBySlug(slug) {
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