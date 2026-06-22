import React from "react";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects">
      <div className="global-container">
        <div className="section-header-row reveal">
          <div>
            <div className="section-label">(Work)</div>
            <h2 className="section-title">Projects</h2>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="project-card animated-card"
              style={{
                "--item-delay": `${idx * 0.1}s`,
              }}
            >
              <div className="project-card-num">{project.id}</div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-desc">{project.description}</p>

              <div className="project-card-tags">
                {project.techStack.map((tag, tagIdx) => (
                  <span key={tagIdx} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-card-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-btn primary"
                >
                  <i className="fab fa-github"></i> Code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-btn"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
