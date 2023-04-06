"use client";

import Image from "next/image";
import React from "react";

import sampleOn from "public/icons/sample.svg";
import sampleOff from "public/icons/sample-2.svg";

import "styles/components/design-systems/sh-listbox/sh-listbox.scss";

interface SHListboxParams {
  leftContainer?: {
    type: "icon" | "image";
    image: HTMLImageElement;
  };
  lineType: 1 | 2 | 3;
  rightContainer?: {
    selected?: boolean;
    text?: string;
    type: "button" | "checkbox";
  };
  text: string[];
  onClick?(): void;
}

export function SHListbox({
  leftContainer,
  lineType,
  rightContainer,
  text,
  onClick,
}: SHListboxParams) {
  const leftIconsize: number =
    leftContainer?.type === "icon" ? 40 : lineType === 1 ? 56 : 60;

  return (
    <div
      className={`sh-listbox-container-${lineType}`}
      onClick={onClick}
      tabIndex={0}
    >
      {leftContainer !== undefined && (
        <Image
          className="left-img"
          src={leftContainer.image}
          width={leftIconsize}
          height={leftIconsize}
          alt=""
        />
      )}
      <div className="text-container">
        <p className="title">{text[0]}</p>
        <p className="subtitle">{text[1]}</p>
      </div>
      {rightContainer !== undefined && (
        <div className="right-container">
          {rightContainer.type === "button" ? (
            <div className="btn">
              <p className="text">{rightContainer.text}</p>
            </div>
          ) : (
            <Image
              className="img"
              src={rightContainer.selected ? sampleOn : sampleOff}
              width={24}
              height={24}
              alt=""
            />
          )}
        </div>
      )}
    </div>
  );
}
