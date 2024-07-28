"use client";
import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import CreditBlock from "../shared/CreditBlock";
import useCartStore from "@/hooks/useCartStore";
import { Skeleton } from "../ui/skeleton";

const Credit = ({ credit }) => {
  const [open, setOpen] = useState(false);
  const { credit: storedCredit, setCredit } = useCartStore();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setCredit(credit);
    setLoad(false);
  }, [credit, setCredit]);

  return (
    <div>
      {load ? (
        <Skeleton className={"h-6 w-20"} />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-dark-100 p-1 px-2"
        >
          <span className="text-white">wallet: ₹{storedCredit}</span>
          <FaCreditCard size={20} className="text-yellow-500" />
        </button>
      )}
      <CreditBlock open={open} setOpen={setOpen} />
    </div>
  );
};

export default Credit;
