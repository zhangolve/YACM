import { networkChainArray } from "@/app/utils";

export const NetworkSelector = () => {
  return (
    <select>
      {networkChainArray.map((network) => (
        <option value={network.chainId} key={network.chainId}>
          {network.network}
        </option>
      ))}
    </select>
  );
};

export const AssetsSelector = () => {
  return (
    <select>
      <option value="ETH">ETH</option>
      <option value="BNB">BNB</option>
    </select>
  );
};
