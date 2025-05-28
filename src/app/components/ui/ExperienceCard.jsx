"use client"
import { Briefcase } from 'lucide-react';

export default function ExperienceCard({ position, company, location, period, description }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
          <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{position}</h3>
          <div className="flex flex-col md:flex-row md:items-center text-gray-600 dark:text-gray-300 mb-2">
            <span className="font-medium">{company}</span>
            <span className="hidden md:block mx-2">•</span>
            <span>{location}</span>
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{period}</p>
          <ul className="space-y-2">
            {description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2"></span>
                <span className="dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}