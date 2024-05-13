import { useState, useEffect } from "react";
import { ethers } from "ethers";
import useLocalStorage from "use-local-storage";
import _ from "lodash";

export const useWallet = () => {
  const [signer, setSigner] = useState(null);
  const [wallets, setWallets] = useLocalStorage("wallets", []);
  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      await provider.send("eth_requestAccounts", []);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const networkName = network.name;
      const balanceBigNumber = await provider.getBalance(signer.address);
      const balance = ethers.formatEther(balanceBigNumber);
      const wallet = {
        address: signer.address,
        network: networkName,
        networkChainId: network.chainId,
        value: balance,
        label: "wallet",
      };
      const newWallets = _.uniqWith([...wallets, wallet], (obj1, obj2) => {
        return (
          obj1.address === obj2.address &&
          parseInt(obj1.networkChainId) === parseInt(obj2.networkChainId)
        );
      });

      return setWallets(newWallets);

      // console.log(signer,'signer')

      // console.log(balance, 'balance')
      // setBalance(balance)
      //     const balances = {};
      //     for (const token of tokens) {
      //       const tokenContract = new ethers.Contract(token.address, erc20Abi, provider);

      //       const balance = await tokenContract.balanceOf(signer.address);
      //       console.log(balance, 'balance')
      //       const decimals = await tokenContract.decimals();

      //       balances[token.name] = ethers.formatUnits(balance, decimals);
      //   }
      //   console.log("Token Balances:", balances);
    }
  };
  return [wallets, connectWallet];
};

export const useOnlineWallet = () => {
  const [wallet, setWallet] = useState({});
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log(accounts, "accounts");
      });
      window.ethereum.on("chainChanged", (chainId, ...rest) => {
        setWallet({ ...wallet, networkChainId: parseInt(chainId, 16) });
      });
    }
  }, [wallet]);

  useEffect(() => {
    async function getOnlineWallet() {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const networkName = network.name;
      const networkChainId = network.chainId;
      return { address: signer.address, network: networkName, networkChainId };
    }

    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");

      // Check if MetaMask is connected to the website
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) {
            console.log("MetaMask is connected!");
            getOnlineWallet().then((wallet) => {
              console.log(wallet, "wallet");
              setWallet(wallet);
            });
            // MetaMask is connected, you can proceed with your application logic
          } else {
            console.log("MetaMask is not connected!");
          }
        })
        .catch((error) => {
          console.error("Error checking MetaMask connection:", error);
        });
    } else {
      console.log("MetaMask is not installed!");
    }
  }, []);
  return wallet;
};

export const useMergedWallets = () => {
  const [wallets, connectWallet] = useWallet([]);
  const onlineWallet = useOnlineWallet();
  const [mergedWallets, setMergedWallets] = useState([]);
  useEffect(() => {
    if (onlineWallet) {
      const result = wallets?.map((wallet) => {
        return {
          ...wallet,
          online:
            wallet.address === onlineWallet.address &&
            wallet.networkChainId == onlineWallet.networkChainId,
        };
      });
      console.log(result, "result");
      setMergedWallets(result ?? []);
    } else {
      setMergedWallets(wallets);
    }
  }, [onlineWallet, wallets]);
  return [mergedWallets, connectWallet];
};

// chain id 是唯一的，不同的网络有不同的chain id，通过chain id可以知道对应的网络，至于这个网络名字是简写成bnb还是bsc,还是其他的，可以自己定义

export const chainIdToNetwork = {
  1: {
    chain_name: "Ethereum_Mainnet",
    chain_color: "#0000ff",
  },
  3: {
    chain_name: "Ropsten_Testnet",
    chain_color: "#ffff00",
  },
  42: {
    chain_name: "Kovan_Testnet",
    chain_color: "#008000",
  },
  4: {
    chain_name: "Rinkeby_Testnet",
    chain_color: "#ff0000",
  },
  5: {
    chain_name: "Goerli_Testnet",
    chain_color: "#800080",
  },
  100: {
    chain_name: "xDai",
    chain_color: "#ffa500",
  },
  56: {
    chain_name: "BSC",
    chain_color: "#add8e6",
  },
  137: {
    chain_name: "Matic_Mainnet",
    chain_color: "#9370db",
  },
  42161: {
    chain_name: "Arbitrum_One",
    chain_color: "#008080",
  },
  10: {
    chain_name: "Optimism",
    chain_color: "#90ee90",
  },
};

export const networkChainArray = Object.keys(chainIdToNetwork).map((key) => {
  return {
    chainId: key,
    network: chainIdToNetwork[key].chain_name,
    chain_color: chainIdToNetwork[key].chain_color,
  };
});

export const networkToColor = Object.keys(chainIdToNetwork).reduce(
  (acc, key) => {
    acc[key] = chainIdToNetwork[key].chain_color;
    return acc;
  },
  {},
);

export const statusToColor = {
  Online: "green",
  Offline: "gray",
};
