"use client";
import useSWR from "swr";
import { fetcher } from "@/utils";
import { networkListAtom } from "@/jotai";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default function Home({ children }) {
  const setNetworkList = useSetAtom(networkListAtom);
  const { data, error, isLoading } = useSWR({ url: `/api/networks` }, fetcher);

  useEffect(() => {
    if (data) {
      console.log(data, "data");
      setNetworkList(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <div>loading</div>;
  }

  return children;
}
