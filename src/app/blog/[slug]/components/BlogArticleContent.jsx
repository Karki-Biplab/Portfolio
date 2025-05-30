export default function BlogArticleContent({ post }) {
  return (
    <article className="blog-content bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-700/50 mb-12">
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}