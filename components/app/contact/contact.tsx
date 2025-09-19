// import React from 'react';
import './contact.css';

export default function Contact(){
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Get In Touch</h1>
        <div className="grid">

          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <h3>Email</h3>
                <p><a href="mailto:mgoodie@outlook.com">mgoodie@outlook.com</a></p>
              </div>
              {/* <div className="info-item">
                <h3>Location</h3>
                <p>Peterborough, Ontario</p>
              </div> */}
              <div className="info-item">
                <h3>Social</h3>
                <div className="social-links">
                  <a href="https://www.linkedin.com/in/michael-goodie/" className="social-link">LinkedIn</a>
                  <a href="https://github.com/gidsola" className="social-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send Me a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={5} placeholder="Your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

