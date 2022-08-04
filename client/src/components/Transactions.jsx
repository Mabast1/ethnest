import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import TransactionCard from "./TransactionCard";

const Transactions = () => {
  const { currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <h3 className="text-white text-3xl text-center my-2">
              Connect your account to see the latest transactions!
            </h3>
            <p className="text-gray-400 text-center">
              take a look at some dummy transaction data below or connect your
              wallet to see your own transactions
            </p>
            <div className="flex flex-wrap justify-center items-center mt-10">
              {dummyData.reverse().map((item, idx) => (
                <TransactionCard key={item + idx} {...item} />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {/* {[...dummyData].reverse().map((item, idx) => (
            <TransactionCard key={item + idx} {...item} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
