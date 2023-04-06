"use client";

import { ChangeEvent, useState } from "react";

interface InputProps {
  em: string;
  pw: string;
}

export default function EmailClient() {
  const [inputValue, setInputValue] = useState<InputProps>({
    em: "",
    pw: "",
  });

  function onChange({ event }: { event: ChangeEvent<HTMLInputElement> }): void {
    const { name, value }: EventTarget & HTMLInputElement = event.target;

    setInputValue({ ...inputValue, [name]: value });
  }

  return (
    <>
      <label>이메일</label>
      <input
        name="email"
        type="email"
        value={inputValue.em}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange({ event: e });
        }}
      />
      <label>비밀번호</label>
      <input
        name="password"
        type="password"
        value={inputValue.pw}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange({ event: e });
        }}
      />
      <p>확인</p>
      <p>가입</p>
    </>
  );
}
