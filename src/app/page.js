"use client";
import { Top, Main, Bottom } from "./Components";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { networkListAtom } from "@/jotai";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default function Home() {
  const setNetworkList = useSetAtom(networkListAtom);
  const { data, error, isLoading } = useSWR({ url: `/api/networks` }, fetcher);

  useEffect(() => {
    if (data) {
      setNetworkList(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Top />
      <Main />
      <Bottom />
    </main>
  );
}
