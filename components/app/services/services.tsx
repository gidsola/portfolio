import '@/css/services.css';

export default function Services({ pageData }: { pageData: ServicesPageData }) {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">My Services</h1>
        <p className="services-intro">{pageData.intro}</p>
        <div className="grid">

          {pageData.offered.map((service, index) => (
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
