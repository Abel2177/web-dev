import React from "react";
import { motion } from "framer-motion";
import { Code2, FileCode, Globe, Palette, Layers, Cpu, GitBranch, Workflow } from "lucide-react";

function Skills() {
  const skills = [
    { name: "React", icon: <Code2 size={18} /> },
    { name: "JavaScript (ES6+)", icon: <FileCode size={18} /> },
    { name: "HTML5", icon: <Globe size={18} /> },
    { name: "CSS3 / Modern CSS", icon: <Palette size={18} /> },
    { name: "Responsive Design", icon: <Layers size={18} /> },
    { name: "Vite", icon: <Cpu size={18} /> },
    { name: "Git & GitHub", icon: <GitBranch size={18} /> },
    { name: "REST APIs", icon: <Workflow size={18} /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          Skills & Technologies
        </motion.h2>
        
        <motion.div 
          className="skills-grid"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="skill-chip"
              variants={item}
              whileHover={{ 
                y: -4, 
                backgroundColor: "#171717",
                borderColor: "#ffffff",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="skill-icon">{skill.icon}</span>
              <span className="skill-name">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;