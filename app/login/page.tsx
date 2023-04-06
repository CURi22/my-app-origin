import Link from "next/link";

import AppleButton from "app/login/apple-button";
import GoogleButton from "app/login/google-button";
import KakaoButton from "app/login/kakao-button";
import NaverButton from "app/login/naver-button";

export default function Login() {
  return (
    <>
      <KakaoButton />
      <NaverButton />
      <GoogleButton />
      <AppleButton />
      <Link href="/login/email">이메일</Link>
    </>
  );
}
