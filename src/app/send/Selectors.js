import { networkChainArray } from "@/constant";
import { useSwitchNetwork } from "./utils";
import useLocalStorage from "use-local-storage";

export const NetworkSelector = () => {
  const switchNetwork = useSwitchNetwork();
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

export const AssetsSelector = () => {
  const [tokens] = useLocalStorage("tokens", []);
  return (
    <select className="p-2.5">
      <option value="ETH">ETH</option>
      {tokens.map((token) => (
        <option value={token.address} key={token.address}>
          {token.name}
        </option>
      ))}
    </select>
  );
};
