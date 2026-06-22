import React from "react";
import { techStackIcons } from "../data/skills";

export default function TechStack() {
  return (
    <section id="stack">
      <div className="global-container">
        <div className="section-header-row reveal" style={{ paddingTop: "2rem", paddingBottom: "1.25rem" }}>
          <div>
            <div className="section-label">(Technologies)</div>
            <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Icons</h2>
          </div>
        </div>

        {techStackIcons.map((section, idx) => (
          <div key={idx} className="stack-section">
            <div className="stack-section-header">{section.section}</div>
            <div className="stack-icons">
              {section.items.map((item, itemIdx) => {
                const globalIdx = idx * 100 + itemIdx;
                return (
                <div key={itemIdx} className="stack-icon-item animated-card"
                  style={{
                    '--item-delay': `${(globalIdx % 12) * 0.04}s`,
                  }}>
                  <img 
                    src={item.icon} 
                    alt={item.name} 
                    className={item.invert ? "invert" : ""} 
                  />
                  <span>{item.name}</span>
                </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
