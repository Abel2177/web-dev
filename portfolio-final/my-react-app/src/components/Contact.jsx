import React, { useState } from "react";
import { Mail, Send, Check } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    localStorage.setItem("name", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("message", formData.message);

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="section-container">
        <h2 className="section-title">Contact Me</h2>
        <p className="contact-subtitle">
          Have a question or want to work together? Leave a message or email me directly at{" "}
          <a href="mailto:abelaalemayehu@email.com" className="contact-mail-link">
            abelalemayehu@example.com
          </a>
        </p>

        {submitted ? (
          <div className="form-success-banner">
            <Check size={18} />
            <span>Thank you! Your message has been sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-submit">
              Send Message <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Contact;