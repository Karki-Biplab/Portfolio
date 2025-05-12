"use client"
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const projectsData = [
    {
      title: "Inventory Management App",
      image: "/project1.png",
      description: "Built using Flutter and Firebase, this solo Final Year Project app helps manage store inventory effectively with real-time updates and barcode scanning.",
      tags: ["Flutter", "Firebase", "FYP"],
      demoLink: "https://youtu.be/RnOXPPQZ5R8"
    },
    {
      title: "Tour & Travels Website",
      image: "/project2.png",
      description: "A group project focused on Nepali tourism. Handled frontend development and supported backend integration for the booking system.",
      tags: ["HTML/CSS", "JavaScript", "PHP"],
      demoLink: "https://travelsandtourz.000webhostapp.com/"
    },
    {
      title: "Vegetable Classification & Sentiment Analysis",
      image: "/project3.png",
      description: "Used deep learning models for image classification and NLP tools like RNN and LSTM for sentiment analysis on product reviews and user feedback.",
      tags: ["Python", "TensorFlow", "NLP", "CNN"],
      demoLink: null
    },
    {
      title: "IoT Door Lock System",
      image: "/project4.png",
      description: "An IoT-based project that uses RFID for secure door access, built with microcontrollers and sensors for enhanced security.",
      tags: ["Arduino", "RFID", "IoT"],
      demoLink: "https://youtu.be/1vr0pS6GA6U"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Projects
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}