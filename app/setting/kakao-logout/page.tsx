import { redirect } from "next/navigation";

export default function KakaoLogout() {
  const kakaoRAPI: string | undefined =
    process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const clientURI: string | undefined = process.env.NEXT_PUBLIC_CLIENT_URI;

  fetch(
    `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRAPI}&logout_redirect_uri=${clientURI}/setting`
  ).catch((e: any) => {
    console.log(e);
  });

  redirect("/home");
}
