import React from "react";

import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="w-full flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
          {["Market", "Exchange", "Tutorials", "Wallets"].map((item, idx) => (
            <p
              className="text-white text-base text-center mx-2 cursor-pointer"
              key={idx}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-center text-sm">
          Come join us and hear for the unexpected miracle
        </p>
        <p className="text-white text-center text-sm font-medium mt-2">
          info@ethnest.io
        </p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.10px] bg-gray-600 mt-5" />

      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-left text-xs">
          {" "}
          @ Ethnest 2022 | Built With ❤ By:{" "}
          <a href="https://mabastahmad.com" className="text-blue-500">
            Mabast Ahmad
          </a>
        </p>
        <p className="text-white text-left text-xs">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
