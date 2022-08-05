import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1 w-[250px] md:w-[400px]">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-2 text-white text-sm">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services py-12 px-4">
      <div className="flex flex-col mf:flex-row justify-center items-center gap-10">
        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center ">
            <h1 className="text-white text-3xl sm:text-5xl py-1 text-gradient">
              Services that we
              <br />
              continue to improve
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center w-full">
          <ServiceCard
            color="bg-[#2952e3]"
            title="Security Garanteed"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is garanteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#8945f8]"
            title="Best Exchange Rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is garanteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#f84550]"
            title="Fastest Transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is garanteed. We always maintain privacy and maintain the quality of our products"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
