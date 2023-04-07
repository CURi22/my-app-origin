"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";

import { fetchModule, FetchOptionProps } from "utils/fetch/fetch-module";
import { uriSource } from "utils/uri-source";

export function KakaoRedirectClient() {
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

  useEffect(() => {
    const option: FetchOptionProps = {
      method: "POST",
      body: {
        server: {
          id: 101,
          token: "temp-token",
        },
        social: {
          service: "kakao",
          token: searchParams?.get("code"),
        },
      },
    };

    fetchModule(uriSource.session, option)
      .then((res: Response) => {
        if (res.status === 200) {
          router.push("/home");
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, [router, searchParams]);

  return <></>;
}
