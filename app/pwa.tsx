"use client";

// import type { Workbox } from "workbox-window";
import { useEffect } from "react";

// declare global {
//   interface Window {
//     workbox: Workbox;
//   }
// }

// export default function PWA() {
//   useEffect(() => {
//     if ("serviceWorker" in navigator && window.workbox !== undefined) {
//       window.workbox.register();
//     } else {
//       console.log("Service Worker registration failed");
//     }
//   }, []);

//   return <></>;
// }

export default function PWA() {
  useEffect(() => {
    const sw: ServiceWorkerContainer | undefined =
      window?.navigator?.serviceWorker;

    if (sw) {
      sw.register("/sw.js", { scope: "/" }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  return <></>;
}
