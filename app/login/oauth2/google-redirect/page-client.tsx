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

export function GoogleRedirectClient() {
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

  useEffect(() => {
    const option: FetchOptionProps = {
      method: "POST",
      body: {
        server: {
          id: 100,
          token: "temp-token",
        },
        social: {
          service: "google",
          token: searchParams?.get("credential"),
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
