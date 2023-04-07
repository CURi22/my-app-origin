"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

import chevronLeft from "public/icons/chevron-left.svg";
import xCircle from "public/icons/x-circle.svg";
import magnifier from "public/icons/search.svg";
import magnifier2 from "public/icons/search-light.svg";
import magnifier3 from "public/icons/search-light-2.svg";

import "styles/components/design-systems/sh-search-bar/sh-search-bar.scss";

interface SHSearchBarParams {
  category: "fill" | "line";
  name?: string;
  placeholder?: string;
  value: string;
  onChangeInput(e: ChangeEvent<HTMLInputElement>): void;
  onClickBack?(): void;
  onClickClear(): void;
  onClickMagnifier(): void;
  onKeyDownInput(): void;
}

export default function SHSearchBar({
  category,
  name,
  placeholder,
  value,
  onChangeInput,
  onClickBack,
  onClickClear,
  onClickMagnifier,
  onKeyDownInput,
}: SHSearchBarParams) {
  const [componentState, setComponentState] = useState<
    "focused" | "enabled" | "enabled2"
  >("enabled");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setComponentState(
      isFocused ? "focused" : 0 < value.length ? "enabled2" : "enabled"
    );
  }, [isFocused, value]);

  function focusDetector(): void {
    setIsFocused(true);
  }

  function blurDetector(): void {
    setIsFocused(false);
  }

  return (
    <div className={`sh-search-bar-container-${category}`}>
      {onClickBack !== undefined && (
        <Image
          className="chevron"
          src={chevronLeft}
          width={35}
          height={35}
          alt="<"
          onClick={onClickBack}
        />
      )}
      <div className={`input-container-${componentState}`}>
        <Image
          className="magnifier"
          src={
            category === "fill"
              ? magnifier3
              : componentState === "enabled"
              ? magnifier2
              : magnifier
          }
          width={16}
          height={16}
          alt="x"
          onClick={onClickMagnifier}
        />
        <input
          className="input"
          name={name ?? "input-one"}
          placeholder={placeholder}
          value={value}
          onBlur={blurDetector}
          onChange={onChangeInput}
          onFocus={focusDetector}
          onKeyDown={onKeyDownInput}
        />
        {0 < value.length && (
          <Image
            className="x-btn"
            src={xCircle}
            width={20}
            height={20}
            alt="x"
            onClick={onClickClear}
          />
        )}
      </div>
    </div>
  );
}
