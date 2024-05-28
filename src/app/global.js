"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { networkListAtom } from "@/jotai";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default function Home({ children }) {
  const setNetworkList = useSetAtom(networkListAtom);
  const { data, isLoading } = useSWR({ url: `/api/networks` }, fetcher);

  useEffect(() => {
    if (data) {
      setNetworkList(data.data);
    }
  }, [data, setNetworkList]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return children;
}
