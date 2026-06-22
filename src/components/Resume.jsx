import React from "react";

// CV file must be placed at: public/documents/Karthikeyan_RJ_CV.pdf
const cvPath = "/documents/Karthikeyan_RJ_CV.pdf";

// Resume file must be placed at: public/documents/Karthikeyan_RJ_Resume.pdf
const resumePath = "/documents/Karthikeyan_RJ_Resume.pdf";

export default function Resume() {
  return (
    <section id="resume" className="card-section-wrapper">
      <div className="portfolio-floating-card cv-resume-card reveal">
        
        <div className="resume-single-column">
          <div className="section-label">(Resume)</div>
          <h2 className="section-card-title">
            Download My Resume / CV
          </h2>
          <p className="section-card-desc">
            My resume covers my education, projects, internship at Phoenix Softech, certifications, and technical skills. Updated for 2026 placements and internship applications.
          </p>

          {/* Resume buttons */}
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem", marginTop: "0.5rem" }}>
            Resume
          </p>
          <div className="card-actions-row" style={{ marginBottom: "1.25rem" }}>
            <a 
              href={resumePath} 
              download="Karthikeyan_RJ_Resume.pdf" 
              className="btn-primary"
            >
              <i className="fas fa-download"></i> Download Resume
            </a>
            <a 
              href={resumePath} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline"
            >
              <i className="fas fa-eye"></i> View Resume
            </a>
          </div>

          {/* CV buttons */}
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>
            CV
          </p>
          <div className="card-actions-row">
            <a 
              href={cvPath} 
              download="Karthikeyan_RJ_CV.pdf" 
              className="btn-primary"
            >
              <i className="fas fa-download"></i> Download CV
            </a>
            <a 
              href={cvPath} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-outline"
            >
              <i className="fas fa-eye"></i> View CV
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
