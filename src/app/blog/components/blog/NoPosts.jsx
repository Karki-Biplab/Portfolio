"use client";

export function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-gray-800/50 rounded-full p-6 mb-6">
        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">No posts found</h3>
      <p className="text-gray-400 text-lg">Try adjusting your filters or check back later for fresh content.</p>
    </div>
  );
}