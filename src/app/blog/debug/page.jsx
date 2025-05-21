import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

// Debug component to show all available posts and their slugs
function getAllPosts() {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }
  
  const files = fs.readdirSync(blogDir);
  
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      try {
        const { data } = matter(fileContents);
        
        return {
          filename,
          frontmatterSlug: data.slug,
          generatedSlug: data.slug || filename.replace('.md', ''),
          title: data.title || 'Untitled',
          date: data.date,
        };
      } catch (error) {
        return {
          filename,
          error: error.message,
          generatedSlug: filename.replace('.md', ''),
        };
      }
    });
}

export default function DebugBlogList() {
  const posts = getAllPosts();
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug: All Blog Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            
            <div className="space-y-1 text-sm">
              <p><strong>Filename:</strong> {post.filename}</p>
              <p><strong>Generated Slug:</strong> {post.generatedSlug}</p>
              <p><strong>Frontmatter Slug:</strong> {post.frontmatterSlug || 'Not set'}</p>
              <p><strong>Date:</strong> {post.date ? (typeof post.date === 'object' && post.date instanceof Date ? post.date.toLocaleDateString() : typeof post.date === 'string' ? post.date : String(post.date)) : 'Not set'}</p>
            </div>
            
            {post.error && (
              <div className="mt-2 p-2 bg-red-50 text-red-600 rounded">
                <strong>Error:</strong> {post.error}
              </div>
            )}
            
            <div className="mt-4 space-x-4">
              <Link 
                href={`/blog/${post.generatedSlug}`}
                className="text-blue-600 underline hover:no-underline"
              >
                View Post (using generated slug)
              </Link>
              
              {post.frontmatterSlug && post.frontmatterSlug !== post.generatedSlug && (
                <Link 
                  href={`/blog/${post.frontmatterSlug}`}
                  className="text-purple-600 underline hover:no-underline"
                >
                  View Post (using frontmatter slug)
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="p-4 bg-yellow-50 rounded-lg">
          No posts found. Check if your blog directory exists.
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Tips:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Check if your markdown files have a <code>slug</code> field in the frontmatter</li>
          <li>Make sure the slug in your blog list matches the generated slug above</li>
          <li>Verify that the file path is correct: <code>src/app/blog/_content/</code></li>
          <li>Check browser console for any JavaScript errors</li>
          <li>Make sure your blog list component is using the same slug generation logic</li>
        </ul>
      </div>
    </div>
  );
}