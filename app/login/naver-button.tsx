"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverButton() {
  const [isReady, setIsReady] = useState<boolean>();

  useEffect(() => {
    if (isReady) {
      const naver: any = window.naver;

      const naverLoginWith: any = new naver.LoginWithNaverId({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
        callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URI}/oauth2/naver`,
        isPopup: false,
        loginButton: {
          color: "green",
          type: 3,
          height: 50,
        },
      });

      naverLoginWith.init();
    }
  }, [isReady]);

  function scriptReadyHandler({ val }: { val: boolean }) {
    setIsReady(val);
  }

  return (
    <>
      <Script
        onReady={() => {
          scriptReadyHandler({ val: true });
        }}
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
      />
      <div id="naverIdLogin" />
    </>
  );
}
