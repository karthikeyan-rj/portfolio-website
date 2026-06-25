import React, { useState, useEffect, useRef } from "react";
import { personalDetails } from "../data/personal";

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("Send Message →");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 900;
    if (prefersReducedMotion || isMobile) return;

    const baseCard = section.querySelector(".base-card");
    const overlayCard = section.querySelector(".overlay-card");
    if (!baseCard || !overlayCard) return;

    const ANIM_START = 0.15;
    const ANIM_END = 0.80;

    const overlayShadow = "0 34px 90px rgba(15, 23, 42, 0.20), -8px 0 35px rgba(15, 23, 42, 0.07)";
    const defaultShadow = "0 18px 45px rgba(15, 23, 42, 0.10)";

    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) { ticking = false; return; }

        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

        // Map through animation window:
        //   0%–15%:  base card stable (Contact)
        //   15%–80%: overlay slides in
        //   80%–100%: overlay card stable (Get in Touch)
        const rawProgress = (progress - ANIM_START) / (ANIM_END - ANIM_START);
        const animProgress = Math.max(0, Math.min(1, rawProgress));
        const eased = easeOut(animProgress);

        // Overlay card: starts at translateX(105%), ends at 0%
        const overlayX = `${105 - eased * 105}%`;
        const overlayScale = 0.985 + eased * 0.015;

        // Base card: slides left slightly and scales down
        const baseX = `${-eased * 28}px`;
        const baseScaleVal = 1 - eased * 0.04;

        overlayCard.style.transform = `translate3d(${overlayX}, 0, 0) scale(${overlayScale})`;
        overlayCard.style.opacity = 1;
        overlayCard.style.boxShadow = eased > 0.1 ? overlayShadow : defaultShadow;

        baseCard.style.transform = `translate3d(${baseX}, 0, 0) scale(${baseScaleVal})`;
        baseCard.style.opacity = Math.max(0, 1 - animProgress * animProgress);

        // Permissive pointer-events: both cards clickable during overlap.
        // Base card stays clickable while still visible (until ~78% into animation).
        // Overlay card becomes clickable once it's visibly present (from ~25% into animation).
        // During 0.25–0.78 both cards are clickable — invisible regions don't block.
        const baseActive = animProgress < 0.78;
        const overlayActive = animProgress > 0.25;

        baseCard.style.pointerEvents = baseActive ? "auto" : "none";
        overlayCard.style.pointerEvents = overlayActive ? "auto" : "none";

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.message.trim().length < 10) return;

    setIsSubmitting(true);
    setSubmitStatus("Sending...");

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send");
      }

      setSubmitStatus("Sent ✓");
      setFormData({ name: "", email: "", message: "", _gotcha: "" });

      setTimeout(() => setSubmitStatus("Send Message →"), 3000);
    } catch (err) {
      setSubmitStatus("Failed — try again");
      setTimeout(() => setSubmitStatus("Send Message →"), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalDetails.email).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        alert(`Could not copy automatically. Please copy manual: ${personalDetails.email}`);
      }
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="contact-card-stage">
      <div className="contact-sticky-wrap">
        <div className="contact-card-stack">
          <div className="scroll-layer base-card">
            <div className="portfolio-floating-card liquid-card">
              <div className="section-label" style={{ marginBottom: "1.5rem" }}>(Contact)</div>
              <h2 className="section-card-title">
                Got a project in mind or just want to say <em>hello?</em>
              </h2>
              <p className="section-card-desc">
                Open to internship opportunities, collaborations, or just a conversation about tech, chess, or anything in between. I usually reply within a day.
              </p>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field-grid">
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Rajan"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label" htmlFor="contact-email">Your Email *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="rajan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label className="form-label" htmlFor="msgArea">Message *</label>
                  <textarea
                    id="msgArea"
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                  <div className="char-count">
                    <span>{formData.message.length}</span> / 10 minimum characters
                  </div>
                </div>
                
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <input name="_gotcha" type="text" value={formData._gotcha} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="contact-submit">
                  <button
                    type="submit"
                    className="submit-btn"
                    id="submitBtn"
                    disabled={isSubmitting || formData.message.length < 10}
                  >
                    {submitStatus}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="scroll-layer overlay-card">
            <div className="portfolio-floating-card liquid-card">
              <div className="section-label" style={{ marginBottom: "1.5rem" }}>(Get in Touch)</div>
              <h2 className="section-card-title">Or reach out directly</h2>
              
              <div className="contact-direct-grid">
                <div className="contact-direct-item email-item liquid-card">
                  <span className="direct-item-label">
                    <i className="fas fa-envelope" style={{ marginRight: "0.5rem", color: "var(--accent)" }}></i>
                    Email
                  </span>
                  <div className="email-copy-wrap">
                    <span className="direct-email-text">{personalDetails.email}</span>
                    <button 
                      className={`copy-btn ${copied ? "copied" : ""}`} 
                      id="copyBtn" 
                      onClick={copyEmailToClipboard}
                    >
                      {copied ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                </div>
                
                <a
                  href={personalDetails.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-direct-link-card liquid-card"
                >
                  <span>
                    <i className="fab fa-linkedin" style={{ marginRight: "0.5rem", color: "var(--accent)" }}></i>
                    LinkedIn
                  </span>
                  <span className="ci-arrow">↗</span>
                </a>
                
                <a
                  href={personalDetails.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-direct-link-card liquid-card"
                >
                  <span>
                    <i className="fab fa-github" style={{ marginRight: "0.5rem", color: "var(--accent)" }}></i>
                    GitHub
                  </span>
                  <span className="ci-arrow">↗</span>
                </a>
                
              </div>

              <div className="contact-footer-note">
                <div className="footer-details-col">
                  <strong>B.E. Computer Science & Engineering</strong><br />
                  {personalDetails.college}<br />
                  Madurai, Tamil Nadu, India
                </div>
                <div className="footer-stats-col">
                  IEEE Student Member · CGPA {personalDetails.cgpa}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
