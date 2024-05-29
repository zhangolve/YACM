// localstorage data, not saved to server
export const chainIdToNetwork = {
  1: {
    chain_name: "Ethereum_Mainnet",
    chain_color: "#0000ff",
    infura_name: "mainnet",
  },
  5: {
    chain_name: "Goerli_Testnet",
    chain_color: "#800080",
  },
  100: {
    chain_name: "xDai",
    chain_color: "#ffa500",
  },
  8453: {
    chain_name: "Base",
    chain_color: "#000000",
    infura_name: "base-mainnet",
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
    infura_name: chainIdToNetwork[key].infura_name,
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
