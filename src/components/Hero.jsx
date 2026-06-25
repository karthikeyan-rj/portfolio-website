import React, { useEffect, useState } from "react";
import { personalDetails } from "../data/personal";

export default function Hero() {
  const [scrambleText, setScrambleText] = useState("");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const finalVal = personalDetails.name;
    const duration = 1200;
    const len = finalVal.length;
    let start = null;

    let frameId;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const revealedCount = Math.floor(progress * len);

      let currentText = "";
      for (let i = 0; i < len; i++) {
        if (i < revealedCount) {
          currentText += finalVal[i];
        } else if (finalVal[i] === " ") {
          currentText += " ";
        } else {
          currentText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setScrambleText(currentText);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setScrambleText(finalVal);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      
      {/* Subtle accent blobs */}
      <div className="hero-accent-blob blob-1" aria-hidden="true"></div>
      <div className="hero-accent-blob blob-2" aria-hidden="true"></div>

      <div className="hero-container">
        <div className="hero-text-content">
          <div className="hero-tag">{personalDetails.subTitle}</div>
          <div className="hero-name-wrap">
            <h1 className="hero-name" id="heroScramble">
              {scrambleText}
            </h1>
          </div>
          
          <p className="hero-tagline" dangerouslySetInnerHTML={{ __html: personalDetails.tagline.replace("full-stack web applications", "<strong>full-stack web applications</strong>") }}></p>
          
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary" onClick={handleScrollToProjects}>
              View Projects →
            </a>
            <a href={personalDetails.github} target="_blank" rel="noreferrer" className="btn-outline">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href={personalDetails.linkedin} target="_blank" rel="noreferrer" className="btn-outline">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="#contact" className="btn-outline" onClick={handleScrollToContact}>
              Get in Touch
            </a>
          </div>

          <div className="hero-social-row">
            <a href={`mailto:${personalDetails.email}`} className="hero-social-link">
              <i className="fas fa-envelope"></i> {personalDetails.email}
            </a>
          </div>
        </div>

      </div>

      <div className="hero-scroll" aria-hidden="true">
        Scroll
      </div>
    </section>
  );
}
