"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import useSWR, { SWRResponse } from "swr";

import { IronSessionUserProps } from "pages/api/cookie/iron-session-user";
import { fetchModule } from "utils/fetch/fetch-module";
import { uriSource } from "utils/uri-source";

export function SettingClient() {
  const user: SWRResponse<IronSessionUserProps> = useSWR(
    uriSource.session,
    (key: string) =>
      fetchModule(key, { method: "GET" }).then((res: Response) => res.json())
  );

  if (user.error) {
    console.log(user.error);
  }

  const router: AppRouterInstance = useRouter();

  function deleteSession(): void {
    fetchModule(uriSource.session, { method: "DELETE" })
      .then((res: Response) => {
        if (res.status === 200) {
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
      {user.data?.server !== undefined && (
        <>
          <div onClick={deleteSession}>세션만 삭제</div>
          <div />
          {user.data.social?.service === "kakao" && (
            <div onClick={withSocial}>카카오도 같이 로그아웃</div>
          )}
        </>
      )}
    </>
  );
}
