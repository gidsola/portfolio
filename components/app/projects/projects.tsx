"use client";

import { useState, useEffect } from 'react';
import './projects.css';


const repos = [
  { url: 'https://api.github.com/repos/gidsola/portfolio' },
  { url: 'https://api.github.com/repos/gidsola/electron-nextjs-starter-app' },
  { url: 'https://api.github.com/repos/gidsola/fitlife' },
  { url: 'https://api.github.com/repos/gidsola/Mistral-AI-ChatBox' },
  { url: 'https://api.github.com/repos/gidsola/Discord-Oauth2' },
  { url: 'https://api.github.com/repos/gidsola/Discord-Interactions' }
];


export default function Projects() {
  const
    [projects, setProjects] = useState<any[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(null);


  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsData = await Promise.all(
          repos.map(async (repo) => {
            const response = await fetch(repo.url);
            if (!response.ok) throw new Error('Failed to fetch');
            // console.log(await response.json());
            return await response.json();
          })
        );
        // console.log(projectsData);
        setProjects(projectsData);
        setLoading(false);
      }
      catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page">
      <div className="page-container">
        <h1 className="section-title">My Projects</h1>
        <div className="grid">

          {projects.map((project) => (
            <div key={project.id} className="card">
              <div className="project-image">
                {project.owner.avatar_url && (
                  <img
                    src={project.owner.avatar_url}
                    alt={`${project.name} avatar`}
                    className="project-avatar"
                  />
                )}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">
                  {project.description || 'No description available'}
                </p>

                <div className="project-meta">
                  <span className="project-language">
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

