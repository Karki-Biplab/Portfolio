"use client"
import { Code2, Database, Cpu } from 'lucide-react';
import SkillCard from '../ui/SkillCard';

export default function Skills() {
  const skillsData = [
    {
      icon: Code2,
      title: "Programming & Web",
      skills: [
        "Flutter, Firebase",
        "Java, Python",
        "HTML, CSS, JavaScript",
        "React, TypeScript",
        "Responsive Design"
      ]
    },
    {
      icon: Database,
      title: "Database & ML",
      skills: [
        "MongoDB, MySQL",
        "Scikit-learn, NumPy, Pandas",
        "ANN, CNN, RNN, LSTM",
        "Data Analysis & Visualization",
        "Natural Language Processing"
      ]
    },
    {
      icon: Cpu,
      title: "Tools & Platforms",
      skills: [
        "Git & GitHub",
        "Android Studio",
        "Figma (UI Design)",
        "IoT & Hardware Programming",
        "Docker & Cloud Services"
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Skills & Tools
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              skills={skill.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}