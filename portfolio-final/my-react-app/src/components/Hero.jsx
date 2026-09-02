import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Github, Linkedin } from "./Icons";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="hero" className="hero-section">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="hero-greeting">Frontend Developer</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-name">
          Abel Alemayehu
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-text">
          I build minimalist, high-performance, and responsive web applications with React, 
          modern JavaScript, and clean CSS architectures.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-buttons">
          <motion.a 
            href="#projects" 
            className="btn btn-primary"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </motion.a>
          <motion.a 
            href="#contact" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={16} />
            <span>Contact Me</span>
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-socials">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            whileHover={{ scale: 1.15, y: -3, color: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            whileHover={{ scale: 1.15, y: -3, color: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={20} />
          </motion.a>
          <motion.a 
            href="mailto:abelalemayehu@example.com" 
            aria-label="Email"
            whileHover={{ scale: 1.15, y: -3, color: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
