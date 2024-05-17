import { networkChainArray } from "@/constant";
import { useSwitchNetwork } from "./utils";

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
  return (
    <select className="p-2.5">
      <option value="ETH">ETH</option>
      <option value="BNB">BNB</option>
    </select>
  );
};
