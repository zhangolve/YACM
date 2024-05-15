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
    addPolygonNetwork();
    console.error("Error switching network:", error);
  }
}

const addPolygonNetwork = async () => {
  const chainId = "0x89"; // Chain ID for Polygon (Matic) Network
  const chainName = "Polygon Mainnet";
  const nativeCurrency = {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  };
  const rpcUrls = ["https://polygon.rpc.blxrbdn.com"]; // RPC URL for Polygon
  const blockExplorerUrls = ["https://polygonscan.com/"];

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: chainId,
          chainName: chainName,
          nativeCurrency: nativeCurrency,
          rpcUrls: rpcUrls,
          blockExplorerUrls: blockExplorerUrls,
        },
      ],
    });
  } catch (error) {
    console.error("Failed to add the network:", error);
  }
};

// Call the function to add the Polygon network
// addPolygonNetwork();

export function toHex(d) {
  const i = parseInt(d);
  return "0x" + i.toString(16).toUpperCase();
  // return "0x" + ("0" + Number(d).toString(16)).slice(-2).toUpperCase();
}
