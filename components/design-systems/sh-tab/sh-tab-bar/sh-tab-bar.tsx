"use client";

import { useState } from "react";

import "styles/components/design-systems/sh-tab/sh-tab-bar/sh-tab-bar.scss";

interface SHTabBarParams {
  defaultIdx?: number;
  fill?: boolean;
  tabs: string[];
  onClick(idx: number): void;
}

export default function SHTabBar({
  defaultIdx,
  fill,
  tabs,
  onClick,
}: SHTabBarParams) {
  const [tabIdx, setTabIdx] = useState<number>(defaultIdx ?? 0);

  function switchTab(idx: number): void {
    setTabIdx(idx);

    onClick(idx);
  }

  return (
    <div
      className={fill ? "sh-tab-bar-container-fill" : "sh-tab-bar-container"}
    >
      {tabs.map((ele: string, idx: number) => (
        <div
          className={idx === tabIdx ? "tab-on" : "tab"}
          onClick={() => {
            switchTab(idx);
          }}
          tabIndex={idx}
          key={ele}
        >
          <p className="text">{ele}</p>
        </div>
      ))}
    </div>
  );
}
