"use client"
export default function SkillCard({ icon: Icon, title, skills }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
        <Icon className="w-12 h-12 text-blue-600 mb-4" />
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <ul className="space-y-2 dark:text-gray-300">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    );
  }