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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Debug: All Blog Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Filename:</strong> {post.filename}
              </div>
              <div>
                <strong>Generated Slug:</strong> {post.generatedSlug}
              </div>
              <div>
                <strong>Frontmatter Slug:</strong> {post.frontmatterSlug || 'Not set'}
              </div>
              <div>
                <strong>Date:</strong> {post.date || 'Not set'}
              </div>
            </div>
            
            {post.error && (
              <div className="text-red-500 mt-2">
                <strong>Error:</strong> {post.error}
              </div>
            )}
            
            <div className="mt-4 space-x-4">
              <Link 
                href={`/blog/${post.generatedSlug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View Post (using generated slug)
              </Link>
              
              {post.frontmatterSlug && post.frontmatterSlug !== post.generatedSlug && (
                <Link 
                  href={`/blog/${post.frontmatterSlug}`}
                  className="text-green-600 hover:text-green-800"
                >
                  View Post (using frontmatter slug)
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Troubleshooting Tips:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Check if your markdown file has a `slug` field in the frontmatter</li>
          <li>Make sure the slug in your blog list matches the generated slug above</li>
          <li>Verify that the file path is correct: `src/app/blog/_content/`</li>
          <li>Check browser console for any JavaScript errors</li>
          <li>Make sure your blog list component is using the same slug generation logic</li>
        </ul>
      </div>
    </div>
  );
}