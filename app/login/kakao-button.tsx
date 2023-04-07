"use client";

import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoButton() {
  const [isReady, setIsReady] = useState<boolean>();

  function kakaoAuthorize(): void {
    const kakao: any = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_CLIENT_URI}/oauth2/kakao`,
    });
  }

  function scriptReadyHandler(val: boolean) {
    setIsReady(val);
  }

  return (
    <>
      <Script
        onReady={() => {
          scriptReadyHandler(true);
        }}
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js"
      />
      {isReady && <button onClick={kakaoAuthorize}>카카오</button>}
    </>
  );
}
