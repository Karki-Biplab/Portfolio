"use client";

export function FilterControls({ 
  allCategories, 
  selectedCategory, 
  setSelectedCategory, 
  sortOrder, 
  setSortOrder 
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
      <div className="flex items-center flex-wrap gap-3">
        <span className="font-semibold text-gray-300 text-lg">Explore:</span>
        {allCategories.map(category => (
          <button 
            key={category} 
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-gray-600 hover:border-gray-500'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="relative">
        <select 
          className="bg-gray-800/70 border border-gray-600 rounded-xl px-6 py-3 text-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-700/70 transition-colors min-w-[200px]"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="newest">Sort by: Newest First</option>
          <option value="oldest">Sort by: Oldest First</option>
          <option value="popular">Sort by: Most Popular</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}