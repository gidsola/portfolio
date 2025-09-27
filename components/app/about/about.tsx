
import '@/css/about.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Me"
};

export default function About({ pageData }: { pageData: AboutPageData }) {

  return (
    <div className="about-me">
      <div className="profile-card">
        <div className="card-header">
          <img
            src="/images/mg.jpeg"
            alt="Profile"
            className="profile-picture"
          />
          <h1 className="name">Michael</h1>
          <p className="title">(gidsola)</p>
        </div>

        <div className="about-content">
          <section className="bio-section">
            <h2>About Me</h2>
            <p>
              Hello 😀, My name is Michael. </p>
            <p> Proud Canadian, pancake perfectionist (ask me for the recipe), and a coding obsessive with a lifetime of building stuff. When I'm not wrestling with Next.js or geeking out over new tech, you'll find me turning random ideas into apps, fueled by coffee and a love for clean, functional code. 48 years young, still learning, and always shipping.
            </p>
          </section>

          <section className="details-section">
            <div className="detail-item">
              <h3>Expertise</h3>
              <p>Backend. Fullstack Applications. Custom API & Pancake 🥞 Stacks</p>
            </div>
            <div className="detail-item">
              <h3>Education</h3>
              <p>Software Engineering Student @ Centennial College.</p><p> Lifelong nerd.</p>
            </div>
          </section>

          <section className="skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              {pageData.skills.map((skill, index) => (
                <span key={index} className="card-tag">{skill}</span>
              ))}
            </div>
          </section>

          <section className="contact-section">
            <h2>Resume</h2>
            <div className="contact-info">
              <p>Online Version: <a href="/resume">Resume</a></p>
              <p>PDF: <a href="/files/resume/michael-goodie-resume.pdf" target="_blank">Download</a></p>
              <p>DOCX: <a href="/files/resume/michael-goodie-resume.docx" target="_blank">Download</a></p>
            </div>
          </section> 

          <section className="contact-section">
            <h2>Get In Touch</h2>
            <div className="contact-info">
              <p>Email: <a href="mailto:mgoodie@outlook.com">mgoodie@outlook.com</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/michael-goodie/">Michael Goodie</a></p>
              <p>GitHub: <a href="https://github.com/gidsola">gidsola</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

