import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header 
      className="navbar-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="nav-container">
        <motion.a 
          href="#hero" 
          className="nav-brand"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Portfolio<span className="brand-dot">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {["about", "skills", "projects", "contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item}`}
              whileHover={{ y: -2, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="nav-mobile-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["about", "skills", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;