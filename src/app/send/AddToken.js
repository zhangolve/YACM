import { useState } from "react";
import { useForm } from "react-hook-form";
import { getContractInfo } from "./utils";

const AddTokenModal = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [tokenName, setTokenName] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    const tokenName = await getContractInfo(data.address);
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
        </form>
      </div>
    </div>
  );
};

export default AddTokenModal;
