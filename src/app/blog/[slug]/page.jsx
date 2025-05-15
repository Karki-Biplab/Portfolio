import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

// Function to get all blog post slugs for static generation
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  const files = fs.readdirSync(blogDir);
  
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || filename.replace('.md', ''),
      };
    });
}

// Function to generate metadata for each blog post
export async function generateMetadata({ params }) {
  // Await the params object
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
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
  const files = fs.readdirSync(blogDir);
  
  // First try to find a file with matching slug in frontmatter
  let postFile = null;
  
  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;
    
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    try {
      const { data } = matter(fileContents);
      
      if (data.slug === slug || filename.replace('.md', '') === slug) {
        postFile = { path: filePath, contents: fileContents };
        break;
      }
    } catch (error) {
      console.error(`Error parsing frontmatter in ${filename}:`, error);
      continue;
    }
  }
  
  if (!postFile) return null;
  
  try {
    // Parse the post content
    const { data, content } = matter(postFile.contents);
    const htmlContent = marked(content);
    
    return {
      slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      description: data.description || 'No description provided',
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

export default async function BlogPost({ params }) {
  // Await the params object
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const post = getPostBySlug(slug);
  
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p>The blog post you are looking for does not exist.</p>
        <Link 
          href="/blog"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          ← Back to Blog
        </Link>
      </div>
    );
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
          {formatDate(post.date)}
        </div>
      </div>
      
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}