import { networkListAtom } from "@/jotai";
import { useAtomValue } from "jotai";
const ethers = require("ethers");

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

export const getContractInfo = async (contractAddress) => {
  // 连接以太坊主网
  console.log(process.env.NEXT_PUBLIC_INFURA_ID);
  const provider = new ethers.JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
  );
  const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ];
  const contract = new ethers.Contract(contractAddress, abiERC20, provider);
  const tokenName = await contract.symbol();
  return tokenName;
};
