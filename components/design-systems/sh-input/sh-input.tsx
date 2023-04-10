"use client";

import Image from "next/image";
import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";

import InputElement from "./input-element";
import TextareaElement from "./textarea-element";

import xCircle from "public/icons/x-circle.svg";
import eyeOn from "public/icons/eye-on.svg";
import eyeOff from "public/icons/eye-off.svg";

import "styles/components/design-systems/sh-input.scss";

interface SHInputParams {
  category:
    | "text-field"
    | "text-area-line"
    | "text-area-fill"
    | "text-area-2-line"
    | "text-area-2-fill"
    | "password-input";
  counter?: number;
  eyeIcon?: boolean;
  helper?: string;
  input: {
    height?: number;
    name?: string;
    maxLength?: number;
    minLength?: number;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    value: string;
    onChangeInput?(
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ): void;
  };
  status?: "disabled" | "enabled" | "error";
  label?: string;
  onClickClear?(): void;
}

export default function SHInput({
  category,
  counter,
  eyeIcon,
  helper,
  input,
  status,
  label,
  onClickClear,
}: SHInputParams) {
  const [componentState, setComponentState] = useState<
    "disabled" | "enabled" | "enabled2" | "error" | "focused"
  >("enabled");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);

  useEffect(() => {
    setComponentState(
      status === "disabled"
        ? "disabled"
        : status === "error"
        ? "error"
        : isFocused
        ? "focused"
        : 0 < input.value.length
        ? "enabled2"
        : "enabled"
    );
  }, [status, isFocused, input.value]);

  function focusDetector(val: boolean): void {
    setIsFocused(val);
  }

  function revealPassword(): void {
    setIsEyeOpen(!isEyeOpen);
  }

  return (
    <div className={`sh-input-container-${category}-${componentState}`}>
      {(counter !== undefined || label !== undefined) && (
        <div className="label-container">
          <label className="label">
            {label}
            {category === "password-input" && <p className="label-wild">*</p>}
          </label>
          {counter !== undefined && (
            <p className="counter">
              {input.value.length} / {counter}
            </p>
          )}
        </div>
      )}
      <div
        className="input-container"
        style={
          category !== "text-field" &&
          category !== "password-input" &&
          input.height !== undefined
            ? { height: input.height }
            : {}
        }
      >
        {category === "text-field" || category === "password-input" ? (
          <InputElement
            input={input}
            isEyeOpen={isEyeOpen}
            disabled={componentState === "disabled"}
            onFocusInput={focusDetector}
          />
        ) : (
          <TextareaElement
            input={input}
            disabled={componentState === "disabled"}
            onFocusInput={focusDetector}
          />
        )}
        {componentState !== "disabled" && 0 < input.value.length && (
          <div className="icon-container">
            {onClickClear !== undefined && (
              <Image
                className="x-btn"
                src={xCircle}
                alt="x"
                width={20}
                height={20}
                onClick={onClickClear}
              />
            )}
            {eyeIcon !== undefined && (
              <Image
                className="eye-btn"
                src={isEyeOpen ? eyeOff : eyeOn}
                width={20}
                height={20}
                alt="o"
                onClick={revealPassword}
              />
            )}
          </div>
        )}
      </div>
      {helper !== undefined && (
        <div className="helper-container">
          <p className="helper">{helper}</p>
        </div>
      )}
    </div>
  );
}
