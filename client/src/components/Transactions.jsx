import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import TransactionCard from "./TransactionCard";

const Transactions = () => {
  const {
    currentAccount,
    connectWallet,
    transactions,
    checkIfTransactionsExist,
  } = useContext(TransactionContext);

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
              Connect your wallet to see the latest transactions!
            </h3>
            <p className="text-gray-400 text-center">
              take a look at some dummy transaction data below or connect your
              wallet to see your own transactions
            </p>
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center px-24 items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
            <div className="flex flex-wrap justify-center items-center mt-10">
              {dummyData.reverse().map((item, idx) => (
                <TransactionCard key={item + idx} {...item} dummy />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {!transactions.length ? (
            [...transactions].reverse().map((item, idx) => {
              if (
                item.addressFrom.toLowerCase() === currentAccount ||
                item.addressTo.toLowerCase() === currentAccount
              )
                return <TransactionCard key={item + idx} {...item} />;
            })
          ) : (
            <div className="flex justify-center items-center flex-col">
              <p className="text-gray-400 text-center">
                No recent transactions found for this account, connect a
                different account in your wallet or make a transaction to view
                your transaction history
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
