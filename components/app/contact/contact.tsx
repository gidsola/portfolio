"use client";
import { useState } from 'react';
import Popup from '@/components/popup/popup'
import '@/css/contact.css';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact"
};

type StatusMsg = {
  showStatus: boolean;
  hasError: boolean;
  showLoading: boolean;
  showButton: boolean;
  title: string;
  message: string;
};
type WS_Response = {success: boolean, message: string};

export default function Contact() {

  const
    clearStatus = () => {
      setStatusMsg({
        showStatus: false,
        hasError: false,
        showLoading: false,
        showButton: true,
        title: "",
        message: ""
      });
    },

    [submitStatus, setStatusMsg] = useState<StatusMsg>({
      showStatus: false,
      hasError: false,
      showLoading: false,
      showButton: true,
      title: "",
      message: ""
    }),

    sendSocketMessage = async (formData: FormData, wsUrl: string): Promise<WS_Response> => {
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
    },

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setStatusMsg({
          showStatus: true,
          hasError: false,
          showLoading: true,
          showButton: false,
          title: "Sending...",
          message: "Your message is being sent.",
        });

        const
          target = e.currentTarget,
          response = await sendSocketMessage(new FormData(target), window.origin + '/ws'),
          msgbody = {
            showStatus: true,
            hasError: response.success ? false : true,
            showLoading: false,
            showButton: true,
            title: response.success ? "Success!" : "Error!",
            message: response.success ? "Message Sent!" : "Failed to send your message. Please try again.",
          };

        await new Promise(r => setTimeout(r, 3000)); // just for kicks :)
        setStatusMsg(msgbody);

        target.reset();
      }
      catch (e: any) {
        console.log("failed", e);
        setStatusMsg({
          showStatus: true,
          hasError: true,
          showLoading: false,
          showButton: true,
          title: "Error!",
          message: "Failed to send your message. Please try again.",
        });
      };
    };

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-subtitle">
          Have a question or want to work together? Fill out the form or reach out through any of the channels below.
        </p>

        <div className="grid">

          {/* Contact Info Card */}
          <div className="contact-info-card">
            <h2 className="contact-section-title">
              <FaEnvelope className="contact-icon" /> Contact Information
            </h2>

            <div className="info-item">
              <h3 className="info-title">Email</h3>
              <p className="info-content">
                <a href="mailto:mike@goodsie.ca" className="contact-link">
                  mike@goodsie.ca
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


            <Popup submitStatus={submitStatus} clearStatus={clearStatus} />



          </div>
        </div>
      </div>
    </div>
  );
}
