import Link from 'next/link';
import { FaGraduationCap, FaBook, FaLaptopCode, FaCode, FaCogs } from 'react-icons/fa';
import '@/css/education.css';

export default function Education() {
  const educationItems = [
    {
      title: "Software Engineering Technology",
      institution: "Centennial College",
      dates: "2024 - Present",
      description: [
        "Comprehensive program covering modern software development practices",
        "Focus on backend systems, databases, and full-stack development"
      ],
      courses: [
        "Data Structures & Algorithms",
        "Web Development with JavaScript",
        "Database Design & Management",
        "Software Engineering Principles",
        "Computer Networks & Security"
      ],
      icon: <FaGraduationCap />
    },
    {
      title: "Self-Taught Development",
      institution: "Continuous Learning",
      dates: "2020 - Present",
      description: [
        "Hands-on learning through building real projects",
        "Focus on backend systems, Docker, and real-time applications"
      ],
      skills: [
        "Advanced Node.js and backend development",
        "Docker containerization and orchestration",
        "Real-time applications with WebSockets",
        "Infrastructure as Code principles",
        "Modern JavaScript (ES6+) and TypeScript"
      ],
      icon: <FaBook />
    },
    {
      title: "Professional Development",
      institution: "Ongoing Skills Enhancement",
      dates: "2023 - Present",
      description: [
        "Focused on emerging technologies and best practices",
        "Learning through project-based development"
      ],
      focusAreas: [
        "Advanced Docker and Kubernetes",
        "Microservices architecture",
        "Performance optimization techniques",
        "Cloud computing (AWS, Azure)",
        "Security best practices"
      ],
      icon: <FaLaptopCode />
    }
  ];

  const learningResources = [
    {
      title: "Official Documentation",
      description: "Primary learning resources for core technologies",
      items: [
        "MDN",
        "Node.js Documentation",
        "Docker Documentation",
        "MongoDB Manual",
        "Next.js Documentation"
      ],
      icon: <FaCode />
    },
    {
      title: "Learning Approach",
      description: "I believe in learning by doing. My hands-on education comes from:",
      items: [
        "Time spent building projects",
        "Contributing to open-source communities",
        "Solving complex problems through coding",
        "Staying updated with industry trends",
        "Mentoring and teaching others"
      ],
      icon: <FaCogs />
    }
  ];

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">Education & Learning</h1>

        <section className="mb-2 justify-content">
          <p className="w-600">
            Combining formal education with hands-on project experience to build expertise in backend systems,
            Docker, and real-time architectures through continuous learning.
          </p>
        </section>

        <section>
          <h2 className="section-subtitle">Education Timeline</h2>
          <div className="grid skills-grid">
            {educationItems.map((item, index) => (
              <div key={index} className="education-card">
                <div className="education-header">
                  <div className="education-icon">{item.icon}</div>
                  <div className="education-title-container">
                    <h3 className="education-title">{item.title}</h3>
                    <p className="education-institution">{item.institution}</p>
                  </div>
                  <p className="education-dates">{item.dates}</p>
                </div>

                <div className="education-content">
                  {item.description && (
                    <div className="education-section">
                      {item.description.map((line, i) => (
                        <p key={i} className="education-text">{line}</p>
                      ))}
                    </div>
                  )}

                  {item.courses && (
                    <div className="education-section">
                      <h4>Coursework</h4>
                      <div className="skills-grid">
                        {item.courses.map((course, i) => (
                          <span key={i} className="card-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.skills && (
                    <div className="education-section">
                      <h4>Skills</h4>
                      <div className="skills-grid">
                        {item.skills.map((skill, i) => (
                          <span key={i} className="card-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.focusAreas && (
                    <div className="education-section">
                      <h4>Focus Areas</h4>
                      <div className="skills-grid">
                        {item.focusAreas.map((area, i) => (
                          <span key={i} className="card-tag">{area}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-subtitle">Key Resources</h2>
          <div className="resources-grid">
            {learningResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-header">
                  <div className="resource-icon">{resource.icon}</div>
                  <h3 className="resource-title">{resource.title}</h3>
                </div>
                <p className="resource-description">{resource.description}</p>
                <div className="skills-grid">
                  {resource.items.map((item, i) => (
                    <span key={i} className="card-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


{/* <ul className="education-list">
                <li>Building real projects (like OnSocket and Container Manager)</li>
                <li>Contributing to open-source communities</li>
                <li>Solving complex problems through coding</li>
                <li>Staying updated with industry trends</li>
                <li>Mentoring and teaching others</li>
              </ul> */}