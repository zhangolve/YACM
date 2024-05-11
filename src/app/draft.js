"use client";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

// Example token addresses (replace with the tokens you want to check)
const tokens = [
  { address: "0x55d398326f99059ff775485246999027b3197955", name: "usdt" },
  { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", name: "bnb" },

  // Add more token addresses as needed
];

console.log(ethers, "ethers");
export default function Home() {
  const [balance, setBalance] = useState(0);
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.bitkeep.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      // console.log(signer,'signer')
      // const balanceBigNumber = await provider.getBalance(signer.address);
      // const balance = ethers.formatEther(balanceBigNumber)
      // console.log(balance, 'balance')
      // setBalance(balance)
      const balances = {};
      for (const token of tokens) {
        const tokenContract = new ethers.Contract(
          token.address,
          erc20Abi,
          provider,
        );

        const balance = await tokenContract.balanceOf(signer.address);
        console.log(balance, "balance");
        const decimals = await tokenContract.decimals();

        balances[token.name] = ethers.formatUnits(balance, decimals);
      }
      console.log("Token Balances:", balances);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  // Send money to the address
  const sendMoney = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0xAA102F12737C9d1A268157231E58175383cE52b9",
      value: ethers.parseEther("0.001"),
    });
    console.log(tx);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <input />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendMoney}
      >
        Send Money
      </button>
    </main>
  );
}

// 切换网络，需要重新计算balance
