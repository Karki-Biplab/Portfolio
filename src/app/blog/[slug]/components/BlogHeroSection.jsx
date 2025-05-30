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

export default function BlogHeroSection({ post }) {
  return (
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
  );
}