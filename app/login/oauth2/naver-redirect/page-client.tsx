"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { fetchModule } from "utils/fetch/fetch-module";
import { uriSource } from "utils/uri-source";

export default function NaverRedirectClient() {
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    const urlHash: string = window.location.hash;

    const strStart: string = "access_token=";
    const firstIndex: number = urlHash.indexOf(strStart) + 13;

    const strEnd: string = "&state";
    const lastIndex: number = urlHash.indexOf(strEnd);

    const naverToken: string = urlHash.slice(firstIndex, lastIndex);

    fetchModule({
      uri: uriSource.session,
      option: {
        method: "POST",
        body: {
          server: {
            id: 102,
            token: "temp-token",
          },
          social: {
            service: "naver",
            token: naverToken,
          },
        },
      },
    })
      .then((res: any) => {
        if (res.message === "done") {
          router.push("/home");
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, [router]);

  return <></>;
}
