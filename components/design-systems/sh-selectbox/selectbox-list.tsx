"use client";

import React, { useState } from "react";

interface SelectboxListParams {
  options: string[];
  closeList(): void;
  onFocusList({ val }: { val: string }): void;
}

export function SelectboxList({
  options,
  closeList,
  onFocusList,
}: SelectboxListParams) {
  const [focusedElement, setFocusedElement] = useState<number>(-1);

  function elementFocus({ idx }: { idx: number }): void {
    setFocusedElement(idx);
  }

  return (
    <div className="sh-selectbox-list-background" onClick={closeList}>
      <div className="sh-selectbox-list-container">
        {options.map((ele: string, idx: number) => (
          <React.Fragment key={ele}>
            {idx !== 0 && <div className="divider" />}
            <div
              className={idx === focusedElement ? "list-focused" : "list"}
              onClick={closeList}
              onFocus={() => {
                onFocusList({ val: ele });
                elementFocus({ idx });
              }}
              tabIndex={idx}
            >
              <p className="text">{ele}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
