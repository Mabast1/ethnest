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
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  // const getTransactionHistory = (address) => {
  //   let etherscanProvider = new ethers.providers.EtherscanProvider();

  //   etherscanProvider.getHistory(address).then((history) => {
  //     history.forEach((tx) => {
  //       console.log(tx);
  //     });
  //   });
  // };

  // Checking if wallet (MetaMask) connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return console.log(
          "For this website to work as intended please install and configure MetaMask!"
        );
      } else {
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length) {
          setCurrentAccount(accounts[0]);

          getAllTransactions();

          // getTransactionHistory(accounts[0]);
        } else {
          console.log("No Accounts Found! ");
          window.localStorage.clear("transactionCount");
        }
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const currentTransactionCount =
        await transactionContract.getTransactionCount();

      window.localStorage.setItem("transactionCount", currentTransactionCount);
    } catch (error) {
      console.log(error);
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

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const getAllTransactions = async (account) => {
    try {
      if (!ethereum) return alert("Please install and configure MetaMask!");
      const transactionContract = getEthereumContract();

      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredtransactions = availableTransactions.map((item) => ({
        addressTo: item.receiver,
        addressFrom: item.sender,
        timestamp: new Date(item.timestamp.toNumber() * 1000).toLocaleString(),
        message: item.message,
        keyword: item.keyword,
        amount: parseInt(item.amount._hex) / 10 ** 18,
      }));

      setTransactions(structuredtransactions);

      console.log(structuredtransactions);
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

      // window.location.reload();
    } catch (errors) {
      console.log(errors);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
    // getTransactionHistory();
  }, [transactionCount]);

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
        transactionCount,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
