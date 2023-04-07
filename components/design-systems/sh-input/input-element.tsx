"use client";

import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputElementParams {
  input: {
    name?: string;
    maxLength?: number;
    minLength?: number;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    value: string;
    onChangeInput?(e: ChangeEvent<HTMLInputElement>): void;
  };
  isEyeOpen: boolean;
  disabled: boolean;
  onFocusInput(val: boolean): void;
}

export default function InputElement({
  input,
  isEyeOpen,
  disabled,
  onFocusInput,
}: InputElementParams) {
  function focusDetector() {
    onFocusInput(true);
  }

  function blurDetector() {
    onFocusInput(false);
  }

  return disabled ? (
    <input
      className="input"
      name={input.name ?? "input-one"}
      type={input.type}
      placeholder={input.placeholder}
      value={input.value}
      readOnly={true}
    />
  ) : (
    <input
      className="input"
      name={input.name ?? "input-one"}
      type={input.type === "password" && isEyeOpen ? "text" : input.type}
      placeholder={input.placeholder}
      maxLength={input.maxLength}
      minLength={input.minLength}
      value={input.value}
      onFocus={focusDetector}
      onBlur={blurDetector}
      onChange={input.onChangeInput}
    />
  );
}
