"use client";

import { ChangeEvent } from "react";

interface TextareaElementParams {
  input: {
    name?: string;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    value: string;
    onChangeInput?(e: ChangeEvent<HTMLTextAreaElement>): void;
  };
  disabled: boolean;
  onFocusInput({ val }: { val: boolean }): void;
}

export function TextareaElement({
  input,
  disabled,
  onFocusInput,
}: TextareaElementParams) {
  function focusDetector() {
    onFocusInput({ val: true });
  }

  function blurDetector() {
    onFocusInput({ val: false });
  }

  return disabled ? (
    <textarea
      className="input"
      name={input.name ?? "input-one"}
      placeholder={input.placeholder}
      value={input.value}
      readOnly={true}
    />
  ) : (
    <textarea
      className="input"
      name={input.name ?? "input-one"}
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
