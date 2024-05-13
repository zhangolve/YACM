// Request MetaMask to switch to BSC network
export async function switchToBSCNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }], // Binance Smart Chain Mainnet chain ID
    });
    console.log("Switched to Binance Smart Chain");
  } catch (error) {
    console.error("Error switching network:", error);
  }
}
