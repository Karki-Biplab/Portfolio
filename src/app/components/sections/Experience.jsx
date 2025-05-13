"use client"
import { Briefcase } from 'lucide-react';
import ExperienceCard from '../ui/ExperienceCard';

export default function Experience() {
  const experienceData = [
    {
      position: "Content Writer Intern",
      company: "Nest Nepal Solutions Pvt. Ltd.",
      location: "Dhobighat, Lalitpur",
      period: "March, 2025 - Present",
      description: [
        "Create SEO-optimized content for Nest Nepal's blog, focusing on web hosting, cloud solutions, and digital tools",
        "Collaborate with the marketing team to produce impactful social media captions, product descriptions, and landing page copy",
        "Adapt complex technical concepts into accessible content for Nepali audiences",
        "Update existing blog posts to align with current SEO trends",
        "Contribute to brainstorming and strategic content planning for upcoming campaigns"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Work Experience
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <ExperienceCard 
              key={index}
              position={exp.position}
              company={exp.company}
              location={exp.location}
              period={exp.period}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}