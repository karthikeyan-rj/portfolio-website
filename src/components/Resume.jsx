import React from "react";

// View paths — served directly from public/ folder (no hashing, browser can open inline)
const cvViewPath = "/documents/Karthikeyan_RJ_CV.pdf";
const resumeViewPath = "/documents/Karthikeyan_RJ_Resume.pdf";

// Download paths — backend routes that set Content-Disposition: attachment
// with the correct filename, fixing UUID-named download issue on hosted environments.
const BACKEND = import.meta.env.VITE_API_URL || "http://localhost:5000";
const cvDownloadPath = `${BACKEND}/api/cv/download`;
const resumeDownloadPath = `${BACKEND}/api/resume/download`;

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

          {/* Resume */}
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem", marginTop: "0.5rem" }}>
            Resume
          </p>
          <div className="card-actions-row" style={{ marginBottom: "1.25rem" }}>
            <a
              href={resumeDownloadPath}
              className="btn-primary"
            >
              <i className="fas fa-download"></i> Download Resume
            </a>
            <a
              href={resumeViewPath}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <i className="fas fa-eye"></i> View Resume
            </a>
          </div>

          {/* CV */}
          <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.6rem" }}>
            CV
          </p>
          <div className="card-actions-row">
            <a
              href={cvDownloadPath}
              className="btn-primary"
            >
              <i className="fas fa-download"></i> Download CV
            </a>
            <a
              href={cvViewPath}
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
