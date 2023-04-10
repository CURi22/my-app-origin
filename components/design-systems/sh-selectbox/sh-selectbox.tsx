"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import SelectboxList from "./selectbox-list";

import arrowDown from "public/icons/arrow-down-fill.svg";
import arrowUp from "public/icons/arrow-up-fill.svg";

import "styles/components/design-systems/sh-selectbox.scss";

interface SHSelectboxParams {
  helper?: string;
  options: string[];
  value?: string;
  width?: number;
  onFocusList(val: string): void;
}

export default function SHSelectbox({
  helper,
  options,
  value,
  width,
  onFocusList,
}: SHSelectboxParams) {
  const [isListShow, setIsListShow] = useState<boolean>(false);
  const [selectState, setSelectState] = useState<
    "enabled" | "error" | "focused" | "selected"
  >("enabled");

  useEffect(() => {
    setSelectState(
      helper !== undefined
        ? "error"
        : isListShow
        ? "focused"
        : value === undefined || value === options[0]
        ? "enabled"
        : "selected"
    );
  }, [isListShow]);

  function openList(): void {
    setIsListShow(true);
  }

  function closeList(): void {
    setIsListShow(false);
  }

  return (
    <>
      {isListShow && (
        <SelectboxList
          options={options}
          closeList={closeList}
          onFocusList={onFocusList}
        />
      )}
      <div className={`sh-selectbox-container-${selectState}`}>
        <div
          className="opt-container"
          onClick={openList}
          tabIndex={0}
          style={{ width }}
        >
          <p className="select-txt">{value ?? options[0]}</p>
          {selectState === "focused" ? (
            <Image
              className="icon"
              src={arrowUp}
              width={16}
              height={16}
              alt="△"
            />
          ) : (
            <Image
              className="ico"
              src={arrowDown}
              width={16}
              height={16}
              alt="▽"
            />
          )}
        </div>
        {helper !== undefined && <p className="helper">{helper}</p>}
      </div>
    </>
  );
}
