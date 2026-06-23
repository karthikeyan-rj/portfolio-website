import React from "react";

const cvPath = "/documents/Karthikeyan_RJ_CV.pdf";
const resumePath = "/documents/Karthikeyan_RJ_Resume.pdf";

export default function Resume() {
  return (
    <section id="resume" className="card-section-wrapper">
      <div className="portfolio-floating-card resume-card reveal">
        
        <div className="section-label">(Resume)</div>
        <h2 className="section-card-title">Resume / CV</h2>
        <p className="section-card-desc">
          I'm currently preparing for 2027 and 2028 placement and internship opportunities. My resume and CV highlight my education, projects, certifications, technical skills, and practical software development experience.
        </p>

        <div className="resume-actions">
          <a href={cvPath} target="_blank" rel="noreferrer" className="btn-outline">
            <i className="fas fa-eye"></i> View CV
          </a>
          <a href={cvPath} download="Karthikeyan_RJ_CV.pdf" className="btn-primary">
            <i className="fas fa-download"></i> Download CV
          </a>
          <a href={resumePath} target="_blank" rel="noreferrer" className="btn-outline">
            <i className="fas fa-eye"></i> View Resume
          </a>
          <a href={resumePath} download="Karthikeyan_RJ_Resume.pdf" className="btn-primary">
            <i className="fas fa-download"></i> Download Resume
          </a>
        </div>

      </div>
    </section>
  );
}
