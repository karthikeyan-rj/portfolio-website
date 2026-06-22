import React from "react";
import { personalDetails } from "../data/personal";
// Add your CV PDF at: public/documents/Karthikeyan_RJ_CV.pdf
const cvPath = "/documents/Karthikeyan_RJ_CV.pdf";

export default function Footer() {
  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", target: "hero" },
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Certifications", target: "certifications" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <footer className="footer-redesigned">
      {/* Decorative glow */}
      <div className="footer-glow" aria-hidden="true"></div>

      {/* Top area: Big CTA + back to top */}
      <div className="footer-top">
        <div className="footer-cta-area">
          <h2 className="footer-headline">
            Let's build something<br /><em>together.</em>
          </h2>
          <p className="footer-sub">
            Open to internships, collaborations, and interesting conversations.
          </p>
          <div className="footer-cta-btns">
            <a href={`mailto:${personalDetails.email}`} className="btn-primary">
              <i className="fas fa-envelope"></i> Get in Touch
            </a>
            <a href={cvPath} download="Karthikeyan_RJ_CV.pdf" className="btn-outline">
              <i className="fas fa-download"></i> Resume (PDF)
            </a>
          </div>
        </div>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <span className="btt-arrow">↑</span>
          <span className="btt-label">Back to top</span>
        </button>
      </div>

      {/* Middle area: columns */}
      <div className="footer-columns">
        <div className="footer-col footer-col-brand">
          <a href="#hero" className="footer-brand" onClick={scrollToTop}>
            KRJ<span>.</span>
          </a>
          <p className="footer-brand-desc">
            Computer Science student at {personalDetails.college}, passionate about building modern web applications and exploring cybersecurity.
          </p>
          <div className="footer-socials">
            <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href={personalDetails.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href={`mailto:${personalDetails.email}`} aria-label="Email" className="footer-social-icon">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-label">Navigate</div>
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.target}>
                <a href={`#${link.target}`} onClick={(e) => handleLinkClick(e, link.target)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-label">Connect</div>
          <ul className="footer-links">
            <li>
              <a href={personalDetails.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span className="fl-arr">↗</span>
              </a>
            </li>
            <li>
              <a href={personalDetails.github} target="_blank" rel="noreferrer">
                GitHub <span className="fl-arr">↗</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${personalDetails.email}`}>
                Email <span className="fl-arr">↗</span>
              </a>
            </li>
            <li>
              <a href={cvPath} download="Karthikeyan_RJ_CV.pdf">
                Resume (PDF) <span className="fl-arr">↓</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy-text">
          © {currentYear} {personalDetails.name}. Designed & built with care.
        </span>
        <span className="footer-made-with">
          Made with <span className="heart">♥</span> in Madurai, India
        </span>
      </div>
    </footer>
  );
}
