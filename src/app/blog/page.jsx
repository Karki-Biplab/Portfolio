import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | My Next.js Site',
  description: 'Read the latest articles and tutorials',
};

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

export default function BlogPage() {
  // Get all blog posts
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  const files = fs.readdirSync(blogDir);
  
  const posts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const { data } = matter(fileContent);
      
      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title || 'Untitled Post',
        date: data.date || new Date().toISOString(),
        description: data.description || 'No description provided',
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="space-y-10">
        {posts.length > 0 ? (
          posts.map(post => (
            <article key={post.slug} className="border-b pb-8">
              <div className="text-sm text-gray-500 mb-2">
                {formatDate(post.date)}
              </div>
              <h2 className="text-2xl font-semibold mb-3">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition duration-200"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Read more →
              </Link>
            </article>
          ))
        ) : (
          <p>No blog posts found. Add markdown files to the _content directory.</p>
        )}
      </div>
    </div>
  );
}