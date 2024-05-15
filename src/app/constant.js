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
    chain_name: "Polygon_Mainnet",
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
  59144: {
    chain_name: "Linea Mainnet",
    chain_color: "#ff4500",
  },
  11155111: {
    chain_name: "sepolia_Testnet",
    chain_color: "#ff4500",
  },
};

// https://chainid.network/chains.json

export const networkChainArray = Object.keys(chainIdToNetwork).map((key) => {
  return {
    chainId: key,
    network: chainIdToNetwork[key].chain_name,
    chain_color: chainIdToNetwork[key].chain_color,
  };
});

export const networkChainIdArray = networkChainArray.map((network) => {
  return parseInt(network.chainId);
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
