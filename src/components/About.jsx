import React, { useRef, useState, useEffect, useCallback } from "react";
import { personalDetails } from "../data/personal";
import myPhoto from "../assets/images/MyPhoto.png";

export default function About() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    const maxTilt = 6;
    const newRotateY = ((x - halfW) / halfW) * maxTilt;
    const newRotateX = -((y - halfH) / halfH) * maxTilt;
    setRotateX(newRotateX);
    setRotateY(newRotateY);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <section id="about">
      <div className="global-container">
      <div className="about-inner">
        <div className="about-left">
          <div>
            <div className="section-label">(About Me)</div>
            <h2 className="about-heading reveal">
              Building<br />things that<br /><em>actually work</em>
            </h2>
            
            <div className="about-body">
              {personalDetails.aboutParagraphs.map((para, idx) => (
                <p key={idx} dangerouslySetInnerHTML={{ __html: para }}></p>
              ))}
            </div>

            <div className="about-tags">
              {personalDetails.tags.map((tag, idx) => (
                <span key={idx} className="about-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-visual">
          <div
            className="about-photo-card"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
          >
            <div
              className="about-photo-card-inner"
              style={{
                transform: isMobile ? "none" : `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              }}
            >
              <div
                className="about-photo-glow"
                aria-hidden="true"
                style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,130,246,0.12) 0%, transparent 60%)` }}
              ></div>
              <div className="about-photo-wrap">
                <img src={myPhoto} alt={personalDetails.name} />
              </div>
            </div>
          </div>
          <div className="about-stats-row">
            {personalDetails.stats.map((stat, idx) => (
              <div key={idx} className="about-stat">
                <span className="about-stat-num">{stat.value}</span>
                <span className="about-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
