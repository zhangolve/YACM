import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getContractInfo } from "./utils";
import useLocalStorage from "use-local-storage";
import _ from "lodash";
import { usePrevious } from "@/utils/hooks";

const AddTokenModal = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [tokenName, setTokenName] = useState("");
  const [tokens, setTokens] = useLocalStorage("tokens", []);
  const previousTokens = usePrevious(tokens);
  useEffect(() => {
    if (previousTokens?.length < tokens.length) {
      onClose();
    }
  }, [tokens]);
  const onSubmit = async (data) => {
    setTokens(
      _.uniqBy(
        [...tokens, { address: data.address, name: tokenName }],
        "address",
      ),
    );
  };

  const onContractAddressChange = async (e) => {
    const address = e.target.value;
    const tokenName = await getContractInfo(address);
    console.log(tokenName, "tokenName");
    setTokenName(tokenName);
  };

  return (
    <div
      id="popup-modal-add-token"
      tabindex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative center modal-background p-4 w-full max-w-md max-h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contract Address
              </label>
              <input
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("address", { required: true })}
                onChange={onContractAddressChange}
              />
            </div>
          </div>
          {tokenName && (
            <div className="grid gap-6 mb-6">
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Token Name
                </label>
              </div>
              <div>{tokenName}</div>
            </div>
          )}
          <div className="border-t flex justify-end pt-6 space-x-4">
            <button
              type="button"
              className="px-6 py-2 rounded-md text-black text-sm border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md text-white text-sm border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTokenModal;
