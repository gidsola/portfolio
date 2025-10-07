import Link from 'next/link';
import { FaEnvelope/*, FaPhone*/, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import '@/css/resume.css';

export default function Resume() {

  // TODO: get rid of all the static infos.

  
  // const projects = [
  //   {
  //     name: "OnSocket - No-Code launchpad for AI Discord Bots",
  //     link: "https://github.com/gidsola/onsocket",
  //     tech: ["Node.js", "WebSockets", "Docker", "MySQL", "Infrastructure as Code"],
  //     description: [
  //       "Container Manager - [Sample Only] - https://github.com/gidsola/Docker-Container-Manager",
  //       "Built a WebSocket-based Discord gateway with heartbeat checks and session resumption",
  //       "Implemented no-code bot deployment system using Docker containers",
  //       "Designed for scalability with jittered heartbeats and auto-reconnection",
  //       "Created system to dynamically deploy Discord bots in isolated containers",
  //       "Automated Dockerfile generation, environment setup, and log streaming",
  //       "Reduced manual deployment time from hours to minutes"
  //     ]
  //   },
  //   {
  //     name: "Container Manager - Docker Automation [Sample Only]",
  //     link: "https://github.com/gidsola/Docker-Container-Manager",
  //     tech: ["Node.js", "Docker", "MySQL", "Infrastructure as Code"],
  //     description: [
        
  //     ]
  //   },
  //   {
  //     name: "NetService - Secure Next.js Server",
  //     link: "https://github.com/gidsola/NetService",
  //     tech: ["Node.js", "Next.js", "TLS 1.3", "Security Headers"],
  //     description: [
  //       "Developed custom HTTP/HTTPS server with automatic TLS configuration",
  //       "Implemented security headers (CSP, HSTS, XSS protection)",
  //       "Event-driven architecture for efficient request handling"
  //     ]
  //   },
  //   {
  //     name: "Portfolio Backend - MongoDB Data Layer",
  //     link: "https://github.com/gidsola/MongoConnect",
  //     tech: ["Node.js", "MongoDB", "Next.js"],
  //     description: [
  //       "Built modular MongoDB client for static site generation",
  //       "Optimized data aggregation from multiple collections",
  //       "Integrated with Next.js for seamless frontend-backend communication"
  //     ]
  //   }
  // ];

  const experience = [
    {
      title: "Software Engineering Student",
      company: "Centennial College",
      dates: "2024-Present",
      description: [
        "Developing projects in Node.js, Python, and C# with focus on backend systems",
        "Coursework includes Data Structures, Algorithms, and Database Design"
      ]
    },
    {
      title: "Custom Window Manufacturer",
      company: "Fersina Windows",
      dates: "2020-2024",
      description: [
        "Optimized production workflows by automating inventory tracking",
        "Collaborated with cross-functional teams in fast-paced environment",
        "Developed problem-solving skills applicable to backend development"
      ]
    },
    {
      title: "CNC Operator/Programmer",
      company: "Laicore Fixtures",
      dates: "2010-2013",
      description: [
        "Programmed CNC machines using G-code, developing logical problem-solving skills",
        "Debugged hardware/software failures in real-time",
        "Maintained and improved manufacturing processes"
      ]
    }
  ];

  const skills = {
    "Backend": ["Node.js", "WebSockets", "HTTP/S","REST APIs", "Python (FastAPI)"],
    "DevOps": ["Docker", "Kubernetes", "CI/CD", "Bash/Shell", "GitHub Actions"],
    "Databases": ["MongoDB", "MySQL", "Weaviate", "Pandas"],
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "Tools": ["Git", "TLS/SSL"]
  };

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Resume</h1>

        {/* About Section */}
        <div className="section">
          <h2 className="section-subtitle">Backend Developer | Node.js • Docker • Real-Time Systems</h2>
          <p className="section-intro">
            Results-driven backend developer specializing in Node.js, Docker, and event-driven architectures.
            Adept at building scalable APIs, automated deployment systems, and real-time applications with a focus on
            performance, security, and maintainability.
          </p>
        </div>

        {/* Contact Info */}
        <div className="section">
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:mgoodie@outlook.com" className="contact-link">mgoodie@outlook.com</a>
            </div>
            {/* <div className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:+1234567890" className="contact-link">(123) 456-7890</a>
            </div> */}
            <div className="contact-item">
              <FaLinkedin className="contact-icon" />
              <Link href="https://www.linkedin.com/in/michael-goodie/" className="contact-link" target="_blank">linkedin.com/in/michael-goodie</Link>
            </div>
            <div className="contact-item">
              <FaGithub className="contact-icon" />
              <Link href="https://github.com/gidsola" className="contact-link" target="_blank">github.com/gidsola</Link>
            </div>
            <div className="contact-item">
              <FaGlobe className="contact-icon" />
              <Link href="https://goodsie.ca" className="contact-link" target="_blank">goodsie.ca</Link>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="section">
          <h2 className="section-subtitle">Technical Skills</h2>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                <div className="card-tags">
                  {items.map((skill, index) => (
                    <span key={index} className="card-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        {/* <div className="section">
          <h2 className="section-subtitle">Key Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-title">{project.name}</h3>
                  <Link href={project.link} className="project-link" target="_blank">
                    {project.link.includes('github') ? 'View on GitHub →' : 'View Live →'}
                  </Link>
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="card-tag">{tech}</span>
                  ))}
                </div>
                <ul className="project-description">
                  {project.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="project-bullet">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div> */}

        {/* Experience Section */}
        <div className="section">
          <h2 className="section-subtitle">Work Experience</h2>
          <div className="experience-list">
            {experience.map((job, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{job.title}</h3>
                    <p className="project-company">{job.company}</p>
                  </div>
                  <p className="project-dates">{job.dates}</p>
                </div>
                <ul className="project-description">
                  {job.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="experience-bullet">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* move these to mongo */}

        {/* Education Section */}
        <div className="section">
          <h2 className="section-subtitle">Education</h2>
          <div className="project-card">
            <div className="education-header">
              <h3 className="education-title">Software Engineering Technology</h3>
              <p className="education-school">Centennial College</p>
            </div>
            <p className="education-dates">2024-Present</p>
            <p className="project-description">Relevant coursework: Data Structures, Algorithms, Web Development, Databases</p>
          </div>
        </div>

        {/* Strengths Section */}
        <div className="section">
          <h2 className="section-subtitle">Key Strengths</h2>
          <div className="strengths-grid">
            <div className="project-card">
              <h3 className="strength-title">Backend Development</h3>
              <p className="project-description">Scalable APIs, WebSocket servers, and Docker automation</p>
            </div>
            <div className="project-card">
              <h3 className="strength-title">DevOps & Automation</h3>
              <p className="project-description">CI/CD pipelines and Infrastructure as Code</p>
            </div>
            <div className="project-card">
              <h3 className="strength-title">Full-Stack JavaScript</h3>
              <p className="project-description">Next.js, React, and Node.js for end-to-end solutions</p>
            </div>
            <div className="project-card">
              <h3 className="strength-title">Problem-Solving</h3>
              <p className="project-description">Methodical debugging of complex systems</p>
            </div>
            <div className="project-card">
              <h3 className="strength-title">Mentorship</h3>
              <p className="project-description">Helping teams adopt best practices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
