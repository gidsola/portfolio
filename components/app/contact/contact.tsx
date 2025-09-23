import '@/css/contact.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-subtitle">
          Have a question or want to work together? Fill out the form or reach out through any of the channels below.
        </p>

        <div className="contact-container">
          <div className="card contact-card">
            <h2 className="contact-section-title">
              <FaEnvelope className="contact-icon" /> Contact Information
            </h2>

            <div className="info-item">
              <h3 className="info-title">Email</h3>
              <p className="info-content">
                <a href="mailto:mgoodie@outlook.com" className="contact-link">
                  mgoodie@outlook.com
                </a>
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-title">Social</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/michael-goodie/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="social-icon" /> LinkedIn
                </a>
                <a href="https://github.com/gidsola" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="social-icon" /> GitHub
                </a>
              </div>
            </div>

            <div className="info-item">
              <h3 className="info-title">Location</h3>
              <p className="info-content">Canada</p>
            </div>
          </div>

          <div className="card">
            <h2 className="contact-section-title">
              <FaPaperPlane className="contact-icon" /> Send Me a Message
            </h2>

            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  rows={6}
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
