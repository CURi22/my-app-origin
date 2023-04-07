"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { MutableRefObject, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleAccountCallbackParams {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export default function GoogleButton() {
  const [isReady, setIsReady] = useState<boolean>();

  const btnRef: MutableRefObject<any> = useRef(null);

  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    function googleAuthorize(
      callback: (res: GoogleAccountCallbackParams) => void
    ): void {
      const google: any = window.google;

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback,
      });
    }

    function googleAccountCallback(res: GoogleAccountCallbackParams): void {
      router.replace(`/oauth2/google?credential=${res.credential}`);
    }

    function renderLoginButton(ref: MutableRefObject<any>): void {
      const google: any = window.google;

      google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
      });

      google.accounts.id.prompt();
    }

    if (isReady) {
      googleAuthorize(googleAccountCallback);

      renderLoginButton(btnRef);
    }
  }, [isReady, router, btnRef]);

  function scriptReadyHandler(val: boolean) {
    setIsReady(val);
  }

  return (
    <>
      <Script
        onReady={() => {
          scriptReadyHandler(true);
        }}
        src="https://accounts.google.com/gsi/client"
      />
      <div ref={btnRef} />
    </>
  );
}
