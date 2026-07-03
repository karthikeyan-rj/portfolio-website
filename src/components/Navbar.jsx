import React, { useState, useEffect, useRef } from "react";
import myPhoto from "../assets/images/MyPhoto.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const progressFillRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Track scrolling for progress bar and background fill
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled((prev) => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });

      if (progressFillRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scaleVal = docHeight > 0 ? scrollTop / docHeight : 0;
        progressFillRef.current.style.transform = `scaleX(${scaleVal})`;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
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
          <a
            href="/documents/Karthikeyan_RJ_Resume.pdf"
            download="Karthikeyan_RJ_Resume.pdf"
            className="nav-resume-btn"
          >
            Resume
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
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
        <a
          href="/documents/Karthikeyan_RJ_Resume.pdf"
          download="Karthikeyan_RJ_Resume.pdf"
          className="mob-link mob-resume-link"
        >
          Resume ↓
        </a>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="progress-bar">
        <div className="progress-fill" ref={progressFillRef}></div>
      </div>
    </>
  );
}
