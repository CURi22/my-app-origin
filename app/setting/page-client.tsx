"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import useSWR, { SWRResponse } from "swr";

import { fetchModule } from "utils/fetch/fetch-module";
import { uriSource } from "utils/uri-source";

export function SettingClient() {
  const user: SWRResponse = useSWR(uriSource.session, (key: string) =>
    fetchModule(key, { method: "GET" })
  );

  if (user.error) {
    console.log(user.error);
  }

  const router: AppRouterInstance = useRouter();

  function deleteSession(): void {
    fetchModule(uriSource.session, { method: "DELETE" })
      .then((res: any) => {
        if (res.message === "done") {
          user.mutate();
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  function withSocial(): void {
    deleteSession();

    router.push("/setting/kakao-logout");
  }

  return user.isLoading ? (
    <p>로딩</p>
  ) : (
    <>
      <p>현재 로그인 상태</p>
      <p>{JSON.stringify(user.data)}</p>
      {user.data?.user?.server !== undefined && (
        <>
          <button onClick={deleteSession}>세션만 삭제</button>
          <div />
          {user.data.user.social?.service === "kakao" && (
            <button onClick={withSocial}>카카오도 같이 로그아웃</button>
          )}
        </>
      )}
    </>
  );
}
