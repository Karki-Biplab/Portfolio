// Shared utility functions for the blog

export function formatDate(date) {
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

export function sortPosts(posts, sortOrder) {
  return [...posts].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
    return 0;
  });
}

export function filterPostsByCategory(posts, category) {
  return category === 'All' 
    ? posts 
    : posts.filter(post => post.category === category);
}

export function groupPostsByCategory(posts) {
  return posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});
}

export function getAllCategories(posts) {
  return ['All', ...new Set(posts.map(post => post.category))];
}