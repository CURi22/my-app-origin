"use client";

import { Fragment, useState } from "react";

import { HorizontalDragTab } from "components/horizontal-drag-tab/horizontal-drag-tab";

import "styles/components/design-systems/sh-tab/sh-tag-box.scss";

interface SHTagBoxParams {
  tabs: string[];
  onClick(idx: number): void;
}

export default function SHTagBox({ tabs, onClick }: SHTagBoxParams) {
  const [isTabClickable, setIsTabClickable] = useState<boolean>(true);

  function disableClick(): void {
    setIsTabClickable(false);
  }

  function enableClick(): void {
    setTimeout(() => {
      setIsTabClickable(true);
    });
  }

  function switchTab(idx: number): void {
    onClick(idx);
  }

  return (
    <HorizontalDragTab onScrollWorking={disableClick} onScrollEnd={enableClick}>
      <div className="sh-tag-box-container" draggable={false}>
        {tabs.map((ele: string, idx: number) => (
          <Fragment key={ele}>
            {idx !== 0 && <div className="spacer" />}
            <div
              className="tab"
              onClick={() => {
                isTabClickable && switchTab(idx);
              }}
              tabIndex={idx}
            >
              <p className="text">{ele}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </HorizontalDragTab>
  );
}
