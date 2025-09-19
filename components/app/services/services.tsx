// import React from 'react';
import './services.css';


const services = [
  {
    title: "Full-Stack Application Development",
    description: "End-to-end web application development using modern JavaScript frameworks. From database design to responsive frontends, I build complete solutions tailored to your business needs.",
    technologies: ["React", "Node.js", "SQL", "MongoDB", "Weaviate", "IntraNet Communications"],
    icon: "💻"
  },
  {
    title: "Custom API Development",
    description: "Design and implementation of RESTful APIs that power your applications. I create scalable, well-documented APIs with proper authentication and authorization.",
    technologies: ["Node.js", "Python", "REST", "JWT", "HomeBrew Architectures"],
    icon: "🔗"
  },
  {
    title: "Frontend Development",
    description: "Responsive, accessible user interfaces built with React and modern CSS. I focus on performance, usability, and clean code that's easy to maintain and extend.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    icon: "🎨"
  },
  {
    title: "Backend Systems",
    description: "Robust server-side solutions including database design, business logic implementation, and system architecture. I build secure, efficient backends that scale with your business.",
    technologies: ["Node.js", "Python", "Docker", "AWS", "Sockets"],
    icon: "🖥️"
  },
  {
    title: "Code Reviews & Mentoring",
    description: "Comprehensive code reviews to improve quality, performance, and maintainability. I also provide mentoring to help your team adopt best practices.",
    technologies: ["Code Quality", "Testing", "Documentation", "Team Workflows"],
    icon: "👨‍💻"
  }
];


export default function Services() {

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">My Services</h1>
        <p className="services-intro">
          With experience in full-stack development, I passionately enjoy building
          modern web applications from the ground up. Combining technical
          excellence with practical solutions to deliver high-quality software that
          not only meets your needs, it satisfies them.
        </p>
        <div className="grid">

          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <div className="service-technologies">
                <h4>Technologies</h4>
                <div className="tech-tags">
                  {service.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h2>Ready to start your project?</h2>
          <p>From initial concept to final deployment, I can help bring your ideas to life.</p>
          <a href="/contact" className="btn btn-primary">Get in Touch</a>
        </div>
      </div>
    </div>
  );
};

