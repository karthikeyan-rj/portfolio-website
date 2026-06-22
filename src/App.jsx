import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import TechStack from "./components/TechStack";
import Ticker from "./components/Ticker";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrambleLoaderText, setScrambleLoaderText] = useState("");
  
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  // 1. Scramble & Progress Loader Logic
  useEffect(() => {
    // Scramble loader text
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const finalVal = "KARTHIKEYAN R J";
    const duration = 1100;
    const len = finalVal.length;
    let start = null;
    let scrambleFrameId;

    const stepScramble = (timestamp) => {
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
      setScrambleLoaderText(currentText);

      if (progress < 1) {
        scrambleFrameId = requestAnimationFrame(stepScramble);
      } else {
        setScrambleLoaderText(finalVal);
      }
    };
    scrambleFrameId = requestAnimationFrame(stepScramble);

    // Mock progress tracker
    let progressVal = 0;
    const progressInterval = setInterval(() => {
      progressVal += Math.random() * 4 + 1;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          setLoading(false);
        }, 350);
      }
      setLoadProgress(Math.floor(progressVal));
    }, 45);

    return () => {
      cancelAnimationFrame(scrambleFrameId);
      clearInterval(progressInterval);
    };
  }, []);

  // 2. Custom Cursor Physics (Spring motion)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const updateFollower = () => {
      // Spring interpolation
      const dx = mousePos.current.x - followerPos.current.x;
      const dy = mousePos.current.y - followerPos.current.y;
      followerPos.current.x += dx * 0.12;
      followerPos.current.y += dy * 0.12;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(updateFollower);
    };
    animationFrameId = requestAnimationFrame(updateFollower);

    // Event delegation for cursor hover enlargement
    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, .hero-photo-frame, .stack-icon-item, .project-card, .cert-card, .contact-direct-item, .copy-btn");
      if (target) {
        cursorRef.current?.classList.add("hovered");
        followerRef.current?.classList.add("hovered");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, .hero-photo-frame, .stack-icon-item, .project-card, .cert-card, .contact-direct-item, .copy-btn");
      if (target) {
        cursorRef.current?.classList.remove("hovered");
        followerRef.current?.classList.remove("hovered");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // 3. Scroll Reveal intersection observer
  useEffect(() => {
    if (loading) return;

    const revEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    revEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // 4. Card visibility observer (fall-apart/rebuild on scroll)
  useEffect(() => {
    if (loading) return;

    const cards = document.querySelectorAll(".animated-card");
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (prefersReducedMotion || isMobile) {
      cards.forEach((card) => card.classList.add("card-visible"));
      return;
    }

    cards.forEach((card) => card.classList.add("card-hidden"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("card-hidden");
            entry.target.classList.add("card-visible");
          } else {
            entry.target.classList.remove("card-visible");
            entry.target.classList.add("card-hidden");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <>
      {/* Dynamic Cursor Elements */}
      <div className="cursor" ref={cursorRef} id="cursor">
        <svg className="cursor-diamond" viewBox="0 0 20 20" width="12" height="12" fill="#111827">
          <path d="M10 2L18 10L10 18L2 10Z"/>
        </svg>
      </div>
      <div className="cursor-follower" ref={followerRef} id="cursorFollower"></div>

      {/* Loading Intro Screen */}
      {loading && (
        <div id="loader">
          <div className="loader-name">{scrambleLoaderText}</div>
          <div className="loader-bar-wrap">
            <div className="loader-bar" style={{ width: `${loadProgress}%` }}></div>
          </div>
          <div className="loader-pct">{loadProgress}%</div>
        </div>
      )}

      {/* Primary Application Pages */}
      {!loading && (
        <>
          <Navbar />
          <div className="section-stack">
            <Hero />
          </div>
          <div className="section-stack">
            <About />
          </div>
          <div className="section-stack">
            <Skills />
          </div>
          <div className="section-stack">
            <TechStack />
          </div>
          <Ticker />
          <div className="section-stack">
            <Projects />
          </div>
          <div className="section-stack">
            <Certifications />
          </div>
          <div className="section-stack">
            <Resume />
          </div>
          <div className="section-stack">
            <Contact />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
