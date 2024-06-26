"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ethers } from "ethers";
import FailedModal from "./FailedModal";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useOnlineWallet, connectWallet } from "@/app/utils";

import { AssetsSelector, NetworkSelector } from "./Selectors";
import AddToken from "./AddToken";
import { useSwitchNetwork } from "./utils";

const Send = () => {
  const { register, handleSubmit } = useForm();

  const [showFailedModal, setShowFailedModal] = useState(false);
  const [showAddToken, setShowAddToken] = useState(false);
  const [network, setNetwork] = useState();
  const wallet = useOnlineWallet();
  const switchNetwork = useSwitchNetwork();

  const handleSwitchNetwork = (chainId) => {
    setNetwork(chainId);
    switchNetwork(chainId);
  };
  const sendMoney = async ({ recipient, value }) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const data = ethers.toUtf8Bytes("HelloWorld");
    const dataHexString = ethers.hexlify(data);

    try {
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(value),
        data: dataHexString,
      });
    } catch {
      console.log("error");
      setShowFailedModal(true);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    sendMoney(data);
  };

  console.log(wallet, "wallet");
  return (
    <div className="grid place-items-center mt-10">
      <div className="md:w-1/2 ">
        <h1 className="text-2xl font-bold">Send</h1>

        <div className="flex justify-between">
          <Link
            href="/"
            className="flex items-center text-blue-500 focus:blue-700"
          >
            <MdOutlineKeyboardBackspace />
            Back to home
          </Link>
          <div className="flex">
            <button
              className="flex items-center text-blue-500 focus:blue-700 mx-3"
              onClick={() => setShowAddToken(true)}
            >
              <LuPlus />
              add token
            </button>
            <button className="flex items-center text-blue-500 focus:blue-700">
              <LuPlus />
              add network
            </button>
          </div>
        </div>
        <div className="bg-gray-200 p-4 my-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 mb-6">
              <div>
                <label
                  htmlFor="recipient"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Recipient
                </label>
                <input
                  id="recipient"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("recipient", { required: true })}
                />
              </div>
              <div className="flex justify-between align-center">
                <div>
                  <label
                    htmlFor="network"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Network
                  </label>
                  <NetworkSelector switchNetwork={handleSwitchNetwork} />
                </div>
                <div>
                  <label
                    htmlFor="value"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Assets
                  </label>
                  <AssetsSelector network={network} />
                </div>
                <div>
                  <label
                    htmlFor="value"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    value
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("value")}
                  />
                  {wallet && <div>max: {wallet.value}</div>}
                </div>
              </div>
              {!wallet && (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={connectWallet}
                >
                  Connect wallet
                </button>
              )}
              {wallet && (
                <button
                  type="submit"
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          {showFailedModal && (
            <FailedModal onClose={() => setShowFailedModal(false)} />
          )}
          {showAddToken && <AddToken onClose={() => setShowAddToken(false)} />}
        </div>
      </div>
    </div>
  );
};

export default Send;
