import { Metadata } from "next";
import { ReactNode } from "react";

import ContextProvider from "./context-provider";
import PWA from "./pwa";

import "styles/app/layout.scss";

export const metadata: Metadata = {
  icons: {
    icon: "/resources/favicon.ico",
  },
  manifest: "/resources/manifest.json",
  themeColor: "theme-color",
  title: "여기에 제목을 입력",
};

interface RootLayoutParams {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutParams) {
  return (
    <html lang="en">
      <head />
      <body>
        <ContextProvider>{children}</ContextProvider>
        <PWA />
      </body>
    </html>
  );
}
