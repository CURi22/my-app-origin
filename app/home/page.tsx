import Link from "next/link";

import HomeClient from "./page-client";

export default function Home() {
  return (
    <>
      <p>{`I'm home`}</p>
      <div />
      <Link href="/login">로그인 </Link>
      <div />
      <Link href="/setting">설정</Link>
      <div />
      <Link href="/login/signup">가입 테스트</Link>
      <div style={{ height: 50 }} />
      <HomeClient />
    </>
  );
}
