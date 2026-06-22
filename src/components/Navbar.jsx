import React, { useState, useEffect } from "react";
import myPhoto from "../assets/images/MyPhoto.png";
const cvPath = "/documents/Karthikeyan_RJ_CV.pdf";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Track scrolling for progress bar and background fill
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up intersection observer for active section highlighting
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -50% 0px", // triggers when section occupies the center of the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", target: "hero" },
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Projects", target: "projects" },
    { label: "Certs", target: "certifications" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <a 
          href="#hero" 
          className="nav-logo" 
          onClick={(e) => handleLinkClick(e, "hero")}
        >
          <img src={myPhoto} alt="" className="nav-avatar" />
          KRJ<span>.</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={activeSection === link.target ? "active" : ""}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <a href={cvPath} download="Karthikeyan_RJ_CV.pdf" className="nav-resume-btn">
            Resume ↓
          </a>
          <button 
            className={`hamburger ${mobileMenuOpen ? "open" : ""}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mob-menu ${mobileMenuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.target}
            href={`#${link.target}`}
            className="mob-link"
            onClick={(e) => handleLinkClick(e, link.target)}
          >
            {link.label}
          </a>
        ))}
        {/* Mobile Resume Link */}
        <a href={cvPath} download="Karthikeyan_RJ_CV.pdf" className="mob-link">
          Download Resume (PDF)
        </a>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </>
  );
}
