import React from "react";
import { skillCategories } from "../data/skills";

export default function Skills() {
  return (
    <section id="skills">
      <div className="global-container">
        <div className="section-header-row reveal">
          <div>
            <div className="section-label">(Skills)</div>
            <h2 className="section-title">Technical Stack</h2>
          </div>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="skill-cat animated-card liquid-card"
              style={{
                '--item-delay': `${idx * 0.08}s`,
              }}>
              <h3 className="skill-cat-title">{cat.category}</h3>
              <div className="skill-pills">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
