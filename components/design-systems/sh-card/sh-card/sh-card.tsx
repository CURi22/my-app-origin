"use client";

import "styles/components/design-systems/sh-card/sh-card.scss";

interface SHCardParams {}

export default function SHCard({}: SHCardParams) {
  return (
    <div className="sh-card-container">
      <div className="ico-container"></div>
      <div className="img"></div>
      <div className="desc-container"></div>
    </div>
  );
}
