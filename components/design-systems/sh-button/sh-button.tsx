"use client";

import "styles/components/design-systems/an-button/an-button.scss";

interface SHButtonParams {
  category: {
    color: "primary" | "primary-2" | "secondary";
    line: "fill" | "fill2" | "line";
    shape: "circle" | "round" | "square";
    size: "large" | "regular" | "small";
    status: "disabled" | "enabled" | "pressed";
  };
  text?: string;
  onClick?(): void;
}

export default function SHButton({ category, text, onClick }: SHButtonParams) {
  return (
    <div
      className={`${category.shape}-${category.status}-${category.color}-${category.size}-${category.line}`}
      onClick={onClick}
      tabIndex={0}
    >
      <p className="text">{text}</p>
    </div>
  );
}
