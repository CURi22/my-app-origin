"use client";

import { Fragment, useState } from "react";

import { HorizontalDragTab } from "components/horizontal-drag-tab/horizontal-drag-tab";

import "styles/components/design-systems/sh-tab/sh-tab-box/sh-tab-box.scss";

interface SHTabBoxParams {
  defaultIdx?: number;
  tabs: string[];
  onClick({ idx }: { idx: number }): void;
}

export function SHTabBox({ defaultIdx, tabs, onClick }: SHTabBoxParams) {
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
      <div className="sh-tab-box-container" draggable={false}>
        {tabs.map((ele: string, idx: number) => (
          <Fragment key={ele}>
            {idx !== 0 && <div className="spacer" />}
            <div
              className={idx === tabIdx ? "tab-on" : "tab"}
              onClick={() => {
                isTabClickable && switchTab({ idx });
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
