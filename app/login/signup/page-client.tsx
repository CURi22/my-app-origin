"use client";

import { useEffect, useState } from "react";

import { IronSessionUser } from "pages/api/cookie/iron-session-user";
import { fetchModule } from "utils/fetch/fetch-module";
import { uriSource } from "utils/uri-source";

export default function SignupClient() {
  const [terms, setTerms] = useState<"simple" | "complex">();
  const [pageNum, setPageNum] = useState<number>(0);

  useEffect(() => {
    fetchModule(uriSource.session, { method: "GET" })
      .then((res: Response) => res.json())
      .then((res: IronSessionUser) => {
        setTerms("server" in res ? "simple" : "complex");
      })
      .catch((e: any) => {
        console.log(e);
      });
  }, []);

  const simplePapers: JSX.Element[] = [<p key="s0">simple</p>];
  const fullPapers: JSX.Element[] = [<p key="c0">complex</p>];

  return terms === "simple" ? (
    simplePapers[pageNum]
  ) : terms === "complex" ? (
    fullPapers[pageNum]
  ) : (
    <></>
  );
}
