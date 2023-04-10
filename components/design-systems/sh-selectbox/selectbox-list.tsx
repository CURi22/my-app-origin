"use client";

import React, { Fragment, useState } from "react";

interface SelectboxListParams {
  options: string[];
  closeList(): void;
  onFocusList(val: string): void;
}

export default function SelectboxList({
  options,
  closeList,
  onFocusList,
}: SelectboxListParams) {
  const [focusedElement, setFocusedElement] = useState<number>(-1);

  function elementFocus(idx: number): void {
    setFocusedElement(idx);
  }

  return (
    <div className="sh-selectbox-list-backg" onClick={closeList}>
      <div className="sh-selectbox-list-container">
        {options.map((ele: string, idx: number) => (
          <Fragment key={ele}>
            {idx !== 0 && <div className="div" />}
            <div
              className={idx === focusedElement ? "list-focused" : "list"}
              onClick={closeList}
              onFocus={() => {
                onFocusList(ele);
                elementFocus(idx);
              }}
              tabIndex={idx}
            >
              <p className="txt">{ele}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
