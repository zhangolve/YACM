// Request MetaMask to switch to BSC network
import { ethers } from "ethers";

export async function switchNetwork(chainId) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }], // Binance Smart Chain Mainnet chain ID
    });
    console.log("Switched to Binance Smart Chain");
  } catch (error) {
    console.error("Error switching network:", error);
  }
}

export function toHex(d) {
  const i = parseInt(d);
  return "0x" + i.toString(16).toUpperCase();
  // return "0x" + ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}
