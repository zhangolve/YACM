import { networkChainArray } from "@/constant";
import useLocalStorage from "use-local-storage";

export const NetworkSelector = ({ switchNetwork }) => {
  return (
    <select
      className="p-2.5"
      onChange={(e) => {
        switchNetwork(e.target.value);
      }}
    >
      {networkChainArray.map((network) => (
        <option value={network.chainId} key={network.chainId} className="">
          {network.network}
        </option>
      ))}
    </select>
  );
};

export const AssetsSelector = ({ network }) => {
  const [tokens] = useLocalStorage("tokens", []);
  console.log(network, "n");
  const filteredTokens = tokens.filter((t) => t.network === network);
  return (
    <select className="p-2.5">
      <option value="ETH">ETH</option>
      {filteredTokens.map((token) => (
        <option value={token.address} key={token.address}>
          {token.name}
        </option>
      ))}
    </select>
  );
};
