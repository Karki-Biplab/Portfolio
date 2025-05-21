import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import BlogPage from './components/MainPage';

export const metadata = {
  title: 'Blog | My Next.js Site',
  description: 'Read the latest articles and tutorials on web development, design, and technology',
};

function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

async function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'src/app/blog/_content');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    console.warn(`Blog directory not found: ${blogDir}`);
    return [];
  }

  const files = fs.readdirSync(blogDir);
  
  const allPosts = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContent);
      
      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title || 'Untitled Post',
        date: data.date || new Date().toISOString(),
        description: data.description || 'No description provided',
        category: data.category || 'Uncategorized',
        image: data.image || '/profile.png',
        author: data.author || { name: 'Anonymous', avatar: '/profile.png' },
        readingTime: data.readingTime || getReadingTime(content),
      };
    });

  return allPosts;
}

export default async function BlogPageWrapper() {
  const allPosts = await getBlogPosts();
  
  return <BlogPage allPosts={allPosts} />;
}


