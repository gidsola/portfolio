import React from 'react';
import './about.css';


const aboutSkills= ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'Python', 'Weaviate'];

export default function About() {
  return (
    <div className="about-me">
      <div className="profile-card">
        <div className="profile-header">
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
              {aboutSkills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
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

