import { networkListAtom } from "@/jotai";
import { useAtomValue } from "jotai";

export async function switchNetwork(chainId, chainInfo) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (error) {
    addNetwork(chainInfo);
  }
}

export const useSwitchNetwork = () => {
  const networkList = useAtomValue(networkListAtom);
  const switchNetworkCallback = (originalChainId) => {
    const chainId = toHex(originalChainId);
    const info = networkList?.find(
      (network) => network.chainId == originalChainId,
    );
    if (info) {
      info.chainId = chainId;
    }
    switchNetwork(chainId, info);
  };
  return switchNetworkCallback;
};

const addNetwork = async (chainInfo) => {
  try {
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
