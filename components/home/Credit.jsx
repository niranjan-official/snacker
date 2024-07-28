"use client";
import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import CreditBlock from "../shared/CreditBlock";

const Credit = ({credit}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={()=>setOpen(true)} className="flex items-center gap-2 rounded-lg bg-dark-100 p-1 px-2">
        <span className="text-white">wallet: ₹{credit}</span>
        <FaCreditCard size={20} className="text-yellow-500" />
      </button>
        <CreditBlock open={open} setOpen={setOpen} />
    </div>
  );
};

export default Credit;
