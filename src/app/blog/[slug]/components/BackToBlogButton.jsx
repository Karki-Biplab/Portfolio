import Link from 'next/link';

export default function BackToBlogButton() {
  return (
    <div className="mb-8">
      <Link href="/blog" className="group inline-flex items-center gap-3 text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 hover:gap-4">
        <div className="p-2 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="text-lg">Back to Blog</span>
      </Link>
    </div>
  );
}