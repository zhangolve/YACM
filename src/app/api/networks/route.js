import { NextResponse } from "next/server";
import { networkChainIdArray } from "@/constant";

export async function GET(req) {
  try {
    const result = await fetch("https://chainid.network/chains.json");
    const networks = await result.json();
    const popularNetworks = networks
      .filter((n) => networkChainIdArray.includes(n.chainId))
      .map((n) => ({
        chainId: n.chainId,
        chainName: n.name,
        nativeCurrency: n.nativeCurrency,
        rpcUrls: n.rpc.filter((r) => !r.includes("infura")),
        blockExplorerUrls: n.explorers.map((e) => e.url),
      }));
    return NextResponse.json({ data: popularNetworks }, { status: 200 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
