"use client";
import { useState } from 'react';
import '@/css/contact.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact"
};

type zResponse = { success: boolean | null, message: string };

export default function Contact() {

  const
    [submitStatus, setStatusMsg] = useState<zResponse>({ success: null, message: '' }),
    sendSocketMessage = async (formData: FormData, wsUrl: string): Promise<any> => {
      return new Promise((resolve, reject) => {
        try {
          const
            ws = new WebSocket(wsUrl),
            data = Object.fromEntries(formData.entries());

          ws.onopen = () => {
            ws.send(JSON.stringify({ type: "contact", ...data }));
          };

          ws.onmessage = (event) => {

            const response = JSON.parse(event.data);
            // console.log("RESPONSE: ", response);
            ws.close();
            resolve({ ...response });
          };

          ws.onerror = (e: any) => {
            ws.close();
            resolve({ success: false, message: e.message });
          };

          setTimeout(() => {
            if (ws.readyState !== WebSocket.OPEN) {
              ws.close();
              reject({ success: false, message: 'Failed to connect to server.' });
            };
          }, 3000);

        }
        catch (e: any) {
          reject({ success: false, message: e.message });
        };
      });
    };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setStatusMsg({ success: null, message: '' });

      const
        target = e.currentTarget,
        // formData = new FormData(target),
        response = await sendSocketMessage(new FormData(target), 'ws://localhost/ws');
      console.log("RESPONSE2: ", response);
      setStatusMsg({ success: response.success, message: response.message });

      target.reset();
    } catch (e: any) {
      console.log("failed", e);
      setStatusMsg({ success: false, message: e.message });
    }
  };

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-subtitle">
          Have a question or want to work together? Fill out the form or reach out through any of the channels below.
        </p>

        <div className="contact-container">

          {/* Contact Info Card */}
          <div className="contact-info-card">
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
                <a
                  href="https://www.linkedin.com/in/michael-goodie/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-icon" /> LinkedIn
                </a>
                <a
                  href="https://github.com/gidsola"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="social-icon" /> GitHub
                </a>
              </div>
            </div>

            <div className="info-item">
              <h3 className="info-title">Location</h3>
              <p className="info-content">Canada</p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card">
            <h2 className="contact-section-title">
              <FaPaperPlane className="contact-icon" /> Send Me a Message
            </h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
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
                  name="email"
                  className="form-input"
                  placeholder="Your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
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
            {
              submitStatus.message &&
              <div className={submitStatus.success ? 'success' : 'error'}>
                {submitStatus.message}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
