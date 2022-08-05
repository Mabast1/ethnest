import React, { useContext } from "react";

import { shortenAddress } from "../utils/shortenAddress";
import useFetch from "../hooks/useFetch";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
  dummy,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex w-80 xl:w-96 flex-col rounded-md hover:shadow-2xl">
      {dummy && (
        <div className="flex justify-end">
          <p className="text-gray-400 text-sm bg-gray-800 px-4 absolute rounded-tr-md rounded-bl-md">
            dummy data
          </p>
        </div>
      )}
      <div className="flex flex-col items-center w-full mt-3 gap-2 p-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From:{" "}
              <span className="hover:underline text-blue-400">
                {shortenAddress(addressFrom)}
              </span>
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base ">
              To:{" "}
              <span className="hover:underline text-blue-400">
                {shortenAddress(addressTo)}
              </span>
            </p>
          </a>
          <p className="text-white text-base">
            Amount: <span className="text-orange-400">{amount}</span> ETH
          </p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className=" text-gray-400 font-semibod text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
