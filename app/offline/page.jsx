import React from "react";
import { RiWifiOffLine } from "react-icons/ri";
import { GiVendingMachine } from "react-icons/gi";

const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-dark-100">
      <div className="flex flex-col items-center gap-16 text-white">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-semibold tracking-widest">
            SNACKER
          </span>
          <GiVendingMachine size={300} />
        </div>
        <div className="flex flex-col items-center">
          <RiWifiOffLine size={60} />
          <p className="mt-2 text-xl font-semibold">You are offline</p>
          <p>Check your internet and try again</p>
        </div>
      </div>
    </div>
  );
};

export default page;
