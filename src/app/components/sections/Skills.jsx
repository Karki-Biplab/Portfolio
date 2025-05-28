"use client"
import { Code2, Database, Cpu, Award } from 'lucide-react';
import SkillCard from '../ui/SkillCard';

export default function Skills() {
  const skillsData = [
    {
      icon: Code2,
      title: "Programming & Web",
      skills: [
        "Flutter, Firebase",
        "Python, Java",
        "HTML, CSS, JavaScript",
        "Next.js, React",
        "WordPress"
      ]
    },
    {
      icon: Database,
      title: "Database & ML",
      skills: [
        "Firebase, MongoDB, MySQL",
        "Scikit-learn, NumPy, Pandas",
        "ANN, CNN, RNN, LSTM",
        "Data Analysis & Visualization",
        "Natural Language Processing",
        "Big Data - Hadoop",
        "NoSQL"
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
        "Docker & Cloud Services",
        "SEO Optimization"
      ]
    },
    {
      icon: Award,
      title: "Languages",
      skills: [
        "Nepali (Expert)",
        "English (Experienced)",
        "Hindi (Experienced)"
      ]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 relative">
          Skills & Tools
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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