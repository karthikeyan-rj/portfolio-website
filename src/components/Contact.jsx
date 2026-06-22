import React, { useState } from "react";
import { personalDetails } from "../data/personal";
// Add your CV PDF at: public/documents/Karthikeyan_RJ_CV.pdf
const cvPath = "/documents/Karthikeyan_RJ_CV.pdf";

const apiUrl = import.meta.env.VITE_API_URL || "";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("Send Message →");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // Clipboard fallback
        alert(`Could not copy automatically. Please copy manual: ${personalDetails.email}`);
      }
    );
  };

  return (
    <section id="contact" className="card-section-wrapper">
      {/* CARD 2: Contact Form Card */}
      <div className="portfolio-floating-card contact-form-card stand-out-card reveal">
        
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

      {/* CARD 3: Reach Out Directly Card */}
      <div className="portfolio-floating-card reach-out-card reveal">
        
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>(Get in Touch)</div>
        <h2 className="section-card-title">Or reach out directly</h2>
        
        <div className="contact-direct-grid">
          <div className="contact-direct-item email-item">
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
            className="contact-direct-link-card"
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
            className="contact-direct-link-card"
          >
            <span>
              <i className="fab fa-github" style={{ marginRight: "0.5rem", color: "var(--accent)" }}></i>
              GitHub
            </span>
            <span className="ci-arrow">↗</span>
          </a>
          
          <a 
            href={cvPath} 
            download="Karthikeyan_RJ_CV.pdf" 
            className="contact-direct-link-card download-link-card"
          >
            <span>
              <i className="fas fa-file-pdf" style={{ marginRight: "0.5rem", color: "var(--accent)" }}></i>
              Download Resume
            </span>
            <span className="ci-arrow">↓</span>
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
    </section>
  );
}
