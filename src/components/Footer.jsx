import React from "react";
import { personalDetails } from "../data/personal";

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
    { label: "Projects", target: "projects" },
    { label: "Skills", target: "skills" },
    { label: "Certifications", target: "certifications" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <footer className="footer-redesigned">
      <div className="footer-glass">
        <div className="footer-columns">
          <div className="footer-col footer-col-brand">
            <a href="#hero" className="footer-brand" onClick={scrollToTop}>
              KRJ<span>.</span>
            </a>
            <p className="footer-brand-line">CS Engineer & Full-Stack Developer</p>
            <p className="footer-brand-desc">
              Building clean, practical, and user-focused web applications.
            </p>
            <div className="footer-socials">
              <a href={personalDetails.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href={`mailto:${personalDetails.email}`} aria-label="Email" className="footer-social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <div className="footer-col-label">Quick Links</div>
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
                <a href={personalDetails.github} target="_blank" rel="noreferrer">
                  GitHub <span className="fl-arr">↗</span>
                </a>
              </li>
              <li>
                <a href={personalDetails.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <span className="fl-arr">↗</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${personalDetails.email}`}>
                  Email <span className="fl-arr">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="/documents/Karthikeyan_RJ_Resume.pdf"
                  download="Karthikeyan_RJ_Resume.pdf"
                >
                  Resume <span className="fl-arr">↓</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-cta-line">
          <p>
            Open to internships, collaborations, and interesting conversations —{" "}
            <a href={`mailto:${personalDetails.email}`}>say hello</a>.
          </p>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy-text">
            © {currentYear} • Built with ❤️ by Karthikeyan R J
          </span>
        </div>
      </div>
    </footer>
  );
}
