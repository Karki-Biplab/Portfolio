"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const [visibleCount, setVisibleCount] = useState(3);
  const projectsRef = useRef(null);

  const projectsData = [
    {
      title: "Mall-Scale Smart Rental & Energy Management",
      image: "/smart-rental.png",
      description:
        "A large-scale app for malls to manage rentals and monitor real-time energy usage via smart MCBs with live meter readings, automated billing, and smart appliance control.",
      tags: ["Flutter", "IoT", "Firebase"],
      demoLink: "https://github.com/Karki-Biplab/Mis.ac",
    },
    {
      title: "Inventory Management App",
      image: "/project1.png",
      description:
        "Built using Flutter and Firebase, this solo Final Year Project app helps manage store inventory effectively with real-time updates and barcode scanning.",
      tags: ["Flutter", "Firebase", "FYP"],
      demoLink: "https://youtu.be/RnOXPPQZ5R8",
    },
    {
      title: "Personal Portfolio Website",
      image: "/portfolio.png",
      description:
        "Built a fast, responsive developer portfolio using Next.js and Tailwind CSS with project showcases, dark mode, smooth animations, and a downloadable resume.",
      tags: ["Next.js", "Tailwind CSS", "React"],
      demoLink: null,
    },
    {
      title: "Tour & Travels Website",
      image: "/project2.png",
      description:
        "A group project focused on Nepali tourism. Handled frontend development and supported backend integration for the booking system.",
      tags: ["HTML/CSS", "JavaScript", "PHP"],
      demoLink: "https://travelsandtourz.000webhostapp.com/",
    },
    {
      title: "Vegetable Classification & Sentiment Analysis",
      image: "/project3.png",
      description:
        "Used deep learning models for image classification and NLP tools like RNN and LSTM for sentiment analysis on product reviews and user feedback.",
      tags: ["Python", "TensorFlow", "NLP", "CNN"],
      demoLink: null,
    },
    {
      title: "IoT Door Lock System",
      image: "/project4.png",
      description:
        "An IoT-based project that uses RFID for secure door access, built with microcontrollers and sensors for enhanced security.",
      tags: ["Arduino", "RFID", "IoT"],
      demoLink: "https://youtu.be/1vr0pS6GA6U",
    },
    
    {
      title: "Next.js Client Projects",
      image: "/nextjs-projects.png",
      description:
        "Working on multiple Next.js projects including Susmitayogi.com.np and a website for Shiva Ganga Agro & Vet family business.",
      tags: ["Next.js", "React", "Tailwind"],
      demoLink: "https://susmitayogi.com.np",
    },
    {
      title: "Car Price Prediction",
      image: "/car-price.png",
      description:
        "Used machine learning models with scikit-learn to predict car prices based on various features and attributes.",
      tags: ["Python", "ML", "scikit-learn"],
      demoLink: null,
    },
    {
      title: "E-commerce Data Analysis",
      image: "/ecommerce-analysis.png",
      description:
        "Analyzed e-commerce data using numpy, pandas, and visualization tools to extract meaningful insights for business decisions.",
      tags: ["Python", "Data Analysis", "Visualization"],
      demoLink: null,
    },
  ];

  const visibleProjects = projectsData.slice(0, visibleCount);
  const allProjectsVisible = visibleCount >= projectsData.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, projectsData.length));
  };

  const handleShowLess = () => {
    setVisibleCount(3);
    setTimeout(() => {
      projectsRef.current?.scrollIntoView({ behavior: "smooth"});
    }, 100  );
  };

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-24 bg-white dark:bg-gray-800"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Projects
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="animate-fadeIn opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
                animationDuration: "0.6s",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          {!allProjectsVisible ? (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group hover:shadow-glow"
            >
              <span className="relative z-10">Show More Projects</span>
              <span
                className="relative z-10"
                style={{ animation: "bounce 1.5s infinite" }}
              >
                <ChevronDown />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group hover:shadow-glow"
            >
              <span className="relative z-10">Show Less</span>
              <span
                className="relative z-10 rotate-180"
                style={{ animation: "bounce 1.5s infinite" }}
              >
                <ChevronDown />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        :global(.hover\\:shadow-glow:hover) {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
        }

        .animate-fadeIn {
          animation-name: fadeIn;
        }
      `}</style>
    </section>
  );
}