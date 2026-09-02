import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "./Icons";

function Projects() {
  const projects = [
    {
      title: "Food Menu App",
      description: "A dynamic restaurant menu and ordering application built with React components, category filtering, and real-time state management.",
      tags: ["React", "JavaScript", "CSS3"],
      githubUrl: "https://github.com",
      demoUrl: "#"
    },
    {
      title: "Country Information App",
      description: "An interactive web app that fetches and displays live country data from REST Countries API with search and region filtering.",
      tags: ["JavaScript", "REST API", "Async/Await"],
      githubUrl: "https://github.com",
      demoUrl: "#"
    },
    {
      title: "Shopping List App",
      description: "A responsive shopping list and task tracking application with browser LocalStorage data persistence and item completion tracking.",
      tags: ["React", "LocalStorage", "Modern CSS"],
      githubUrl: "https://github.com",
      demoUrl: "#"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="projects-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="project-card"
              variants={cardVariant}
              whileHover={{ 
                y: -6, 
                borderColor: "#52525b",
                backgroundColor: "#141414",
                transition: { duration: 0.25 }
              }}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag-chip">{tag}</span>
                ))}
              </div>

              <div className="project-links">
                <motion.a 
                  href={project.demoUrl} 
                  className="project-btn primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    if (project.demoUrl === "#") {
                      e.preventDefault();
                      alert("Demo preview link.");
                    }
                  }}
                >
                  <ExternalLink size={15} /> Demo
                </motion.a>
                <motion.a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-btn secondary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Github size={15} /> Code
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
