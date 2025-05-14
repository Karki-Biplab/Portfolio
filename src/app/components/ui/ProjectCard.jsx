"use client"
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project }) {
  const { title, image, description, tags, demoLink } = project;
  
  // Helper function to determine link text based on URL
  const getLinkText = (url) => {
    if (!url) return '';
    if (url.includes('youtu')) return 'Watch Demo';
    if (url.includes('github')) return 'View GitHub';
    if (url.includes('com')) return 'Visit Website';
    return 'View Project';
  };
  
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden group h-full flex flex-col">
      <div className="h-52 relative overflow-hidden">
        <img
          src={image || "/project-placeholder.png"}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ pointerEvents: 'none' }}
        />
        {demoLink && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <a 
              href={demoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
            >
              <ExternalLink size={16} className="mr-2" />
              {getLinkText(demoLink)}
            </a>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
              {tag}
            </span>
          ))}
        </div>
        <p className="mb-4 dark:text-gray-300 flex-grow">{description}</p>
        {demoLink && (
          <div className="mt-auto">
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <ExternalLink className="mr-2" size={16} /> 
              {getLinkText(demoLink)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}