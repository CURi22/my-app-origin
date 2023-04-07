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

  function onChange(e: ChangeEvent<HTMLInputElement> ): void {
    const { name, value }: EventTarget & HTMLInputElement = e.target;

    setInputValue({ ...inputValue, [name]: value });
  }

  return (
    <>
      <label>이메일</label>
      <input
        name="email"
        type="email"
        value={inputValue.em}
        onChange={onChange}
      />
      <label>비밀번호</label>
      <input
        name="password"
        type="password"
        value={inputValue.pw}
        onChange={onChange}
      />
      <p>확인</p>
      <p>가입</p>
    </>
  );
}
