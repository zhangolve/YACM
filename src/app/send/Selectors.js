import { networkChainArray } from "@/app/utils";
import { switchNetwork, toHex } from "./utils";

export const NetworkSelector = () => {
  return (
    <select
      className="p-2.5"
      onChange={(e) => {
        console.log(e.target.value);
        const a = toHex(e.target.value);
        console.log(a, "a");
        switchNetwork(a);
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
