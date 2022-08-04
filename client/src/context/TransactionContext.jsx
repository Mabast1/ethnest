import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { runFireworks } from "../lib/fireWorks";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  //all state declarations
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  // Checking if wallet (MetaMask) connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum)
        return console.log(
          "For this website to work as intended please install and configure MetaMask!"
        );

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        console.log(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("No Accounts Found! ");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install and configure MetaMask!");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      runFireworks();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install and configure MetaMask!");

      // get data from the form
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parasedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        // 0x5208 = 21000 gwei = 0.000021 ethereum
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parasedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parasedAmount,
        keyword,
        message
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      runFireworks();
    } catch (errors) {
      console.log(errors);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
