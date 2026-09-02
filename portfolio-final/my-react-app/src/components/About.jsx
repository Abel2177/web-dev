import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="section">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title">About Me</h2>
        
        <div className="about-text">
          <p>
            I am a frontend developer passionate about crafting intuitive and responsive web interfaces. 
            I enjoy transforming design concepts into clean, maintainable code using React and modern JavaScript.
          </p>
          <p>
            My approach centers on simplicity, performance, and attention to detail. Whether building 
            modular components or integrating APIs, I aim to create smooth experiences that work seamlessly 
            across all devices.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default About;