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
  response: {
    clientId: string;
    client_id: string;
    credential: string;
    select_by: string;
  };
}

export default function GoogleButton() {
  const [isReady, setIsReady] = useState<boolean>();
  const router: AppRouterInstance = useRouter();
  const btnRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    function googleAuthorize({ callback }: { callback(res: any): void }): void {
      const google: any = window.google;

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback,
      });
    }

    function googleAccountCallback({
      response,
    }: GoogleAccountCallbackParams): void {
      router.replace(`/oauth2/google?credential=${response.credential}`);
    }

    function renderLoginButton({ ref }: { ref: MutableRefObject<any> }): void {
      const google: any = window.google;

      google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
      });

      google.accounts.id.prompt();
    }

    if (isReady) {
      googleAuthorize({
        callback: (res: any) => {
          googleAccountCallback({ response: res });
        },
      });

      renderLoginButton({ ref: btnRef });
    }
  }, [isReady, router, btnRef]);

  function scriptReadyHandler({ val }: { val: boolean }) {
    setIsReady(val);
  }

  return (
    <>
      <Script
        onReady={() => {
          scriptReadyHandler({ val: true });
        }}
        src="https://accounts.google.com/gsi/client"
      />
      <div ref={btnRef} />
    </>
  );
}
