"use client";

import { useState } from "react";

import { HorizontalDragTab } from "components/horizontal-drag-tab/horizontal-drag-tab";

import "styles/components/design-systems/sh-tab-box/sh-tab-box.scss";

interface SHTabBoxParams {
  category: "tab" | "tag";
  defaultIdx?: number;
  tabs: string[];
  onClick({ idx }: { idx: number }): void;
}

export function SHTabBox({
  category,
  defaultIdx,
  tabs,
  onClick,
}: SHTabBoxParams) {
  const [tabIdx, setTabIdx] = useState<number>(defaultIdx ?? 0);
  const [isTabClickable, setIsTabClickable] = useState<boolean>(true);

  function disableClick(): void {
    setIsTabClickable(false);
  }

  function enableClick(): void {
    setTimeout(() => {
      setIsTabClickable(true);
    });
  }

  function switchTab({ idx }: { idx: number }): void {
    setTabIdx(idx);

    onClick({ idx });
  }

  return (
    <HorizontalDragTab onScrollWorking={disableClick} onScrollEnd={enableClick}>
      <div className={`sh-tab-box-container-${category}`}>
        {tabs.map((ele: string, idx: number) => (
          <div
            className={idx === tabIdx ? "tab-on" : "tab"}
            onClick={() => {
              isTabClickable && switchTab({ idx });
            }}
            tabIndex={idx}
            key={ele}
          >
            <p className="text">{ele}</p>
          </div>
        ))}
      </div>
    </HorizontalDragTab>
  );
}
