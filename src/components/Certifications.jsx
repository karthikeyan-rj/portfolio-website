import React from "react";
import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="global-container">
        <div className="section-header-row reveal">
          <div>
            <div className="section-label">(Learning)</div>
            <h2 className="section-title">Certifications</h2>
          </div>
        </div>
        <div className="certs-grid">
          {certifications.map((cert, idx) => (
            <div key={idx} className="cert-card animated-card liquid-card"
              style={{
                '--item-delay': `${idx * 0.07}s`,
              }}>
              <div className="cert-platform">
                <span className="cert-platform-dot"></span>
                {cert.platform}
              </div>
              <h3 className="cert-name">{cert.title}</h3>
              <a
                href={cert.certificateUrl}
                target="_blank"
                rel="noreferrer"
                className="cert-link"
              >
                <i className="fas fa-certificate"></i> View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
