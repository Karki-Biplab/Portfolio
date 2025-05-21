import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// Function to get all blog post slugs for static generation
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    console.warn('Blog content directory not found:', blogDir);
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  
  const params = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);    
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      try {
        const { data } = matter(fileContents);
        
        // Use slug from frontmatter if available, otherwise use filename
        const slug = data.slug || filename.replace('.md', '');
        
        console.log('Generated slug:', slug, 'from file:', filename); // Debug log
        
        return {
          slug: slug,
        };
      } catch (error) {
        console.error(`Error parsing ${filename}:`, error);
        return {
          slug: filename.replace('.md', ''),
        };
      }
    });
    
  console.log('All generated params:', params); // Debug log
  return params;
}

// Function to generate metadata for each blog post
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    };
  }
  
  return {
    title: `${post.title} | My Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `/blog/${slug}`,
    },
  };
}

// Function to get blog post by slug
function getPostBySlug(slug) {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    console.error('Blog content directory not found:', blogDir);
    return null;
  }
  
  const files = fs.readdirSync(blogDir);
  
  console.log('Looking for slug:', slug); // Debug log
  console.log('Available files:', files); // Debug log
  
  // First try to find a file with matching slug in frontmatter or filename
  let postFile = null;
  
  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;
    
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { data } = matter(fileContents);
      
      // Check both frontmatter slug and filename-based slug
      const frontmatterSlug = data.slug;
      const filenameSlug = filename.replace('.md', '');
      
      console.log(`File: ${filename}, frontmatter slug: ${frontmatterSlug}, filename slug: ${filenameSlug}`); // Debug log
      
      if (frontmatterSlug === slug || filenameSlug === slug) {
        postFile = { path: filePath, contents: fileContents };
        console.log('Found matching post:', filename); // Debug log
        break;
      }
    } catch (error) {
      console.error(`Error parsing frontmatter in ${filename}:`, error);
      continue;
    }
  }
  
  if (!postFile) {
    console.error('No matching post found for slug:', slug); // Debug log
    return null;
  }
  
  try {
    // Parse the post content
    const { data, content } = matter(postFile.contents);
    const htmlContent = marked(content);
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      description: data.description || 'No description provided',
      author: data.author || 'Unknown Author',
      tags: data.tags || [],
      content: htmlContent,
    };
  } catch (error) {
    console.error('Error processing post content:', error);
    return null;
  }
}

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

export default function BlogPost({ params }) {
  const { slug } = params;
  
  console.log('BlogPost component - received slug:', slug); // Debug log
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    console.log('Post not found, calling notFound()'); // Debug log
    notFound(); // This will show the 404 page
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-6">
          <span>By {post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.date)}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}