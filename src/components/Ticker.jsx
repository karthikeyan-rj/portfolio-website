import React from "react";
import { personalDetails } from "../data/personal";

export default function Ticker() {
  // Repeat items once to make sure there's enough width for the marquee animation track
  const doubleItems = [...personalDetails.tickerItems, ...personalDetails.tickerItems];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubleItems.map((item, idx) => (
          <span key={idx} className="ticker-item">
            <span className="ticker-dot"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
