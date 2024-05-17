import { networkListAtom } from "@/jotai";
import { useAtom } from "jotai";

export async function switchNetwork(chainId, chainInfo) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    addPolygonNetwork(chainInfo);
  }
}

export const useSwitchNetwork = () => {
  const [networkList, setNetworkList] = useAtom(networkListAtom);
  const switchNetworkCallback = (originalChainId) => {
    const chainId = toHex(originalChainId);
    const info = networkList?.find(
      (network) => network.chainId == originalChainId,
    );
    console.log(info, "info");
    if (info) {
      info.chainId = chainId;
    }
    switchNetwork(chainId, info);
  };
  return switchNetworkCallback;
};

const addPolygonNetwork = async (chainInfo) => {
  try {
    console.log(chainInfo, "chainInfo");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [chainInfo],
    });
  } catch (error) {
    console.error("Failed to add the network:", error);
  }
};

export function toHex(d) {
  const i = parseInt(d);
  return "0x" + i.toString(16).toUpperCase();
}
