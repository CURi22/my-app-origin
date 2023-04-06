"use client";

import Script from "next/script";
import { useState } from "react";

export default function AppleButton() {
  const [isReady, setIsReady] = useState<boolean>();

  return (
    <>
      <Script onReady={() => setIsReady(true)} src="" />
    </>
  );
}

// https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple
