import '@/css/projects.css';

export default function Projects({ pageData }: { pageData: ProjectPageData }) {
  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">My Projects</h1>
        <div className="grid">

          {pageData.projects && pageData.projects.map((project) => (
            <div key={project.id} className="card project-card cardhover">
              <div className="card-header project-header">
                {project.owner.avatar_url && (
                  <img
                    src={project.owner.avatar_url}
                    alt={`${project.name} avatar`}
                    className="project-avatar"
                  />
                )}
              </div>

              <div className="container">
                <h3 className="card-title">{project.name}</h3>
                <p className="card-description">
                  {project.description || 'No description available'}
                </p>

                <div className="project-meta">
                  <span className="card-tag">
                    {project.language || 'Unknown'}
                  </span>
                  <span className="project-stars">⭐ {project.stargazers_count}</span>
                </div>

                <a href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary project-link"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
