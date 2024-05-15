import { NextResponse } from "next/server";
import { networkChainIdArray } from "@/constant";

export async function GET(req) {
  try {
    const result = await fetch("https://chainid.network/chains.json");
    const networks = await result.json();
    console.log(networkChainIdArray, "999");
    const popularNetworks = networks.filter((n) =>
      networkChainIdArray.includes(n.chainId),
    );
    return NextResponse.json({ data: popularNetworks }, { status: 500 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
