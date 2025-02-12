"use client";
import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import useSnackerStore from "@/hooks/useSnackerStore";
import { Skeleton } from "../ui/skeleton";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

const CreditButton = ({ userId }) => {
  const {
    credit: storedCredit,
    setCredit,
    setOpenCreditWallet,
  } = useSnackerStore();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getCredits();
  }, []);

  const getCredits = async () => {
    setLoad(true);
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setCredit(data.credit);
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e.message);
    }
    setLoad(false);
  };
  return (
    <div className="relative">
      {load ? (
        <Skeleton className={"h-6 w-20"} />
      ) : (
        <button
          onClick={() => setOpenCreditWallet(true)}
          className="flex items-center gap-2 rounded-lg bg-dark-100 p-1 px-2"
        >
          <span className="text-white">wallet: ₹{storedCredit}</span>
          <FaCreditCard size={20} className="text-pink-300" />
        </button>
      )}
      <div className="absolute -right-3 -bottom-1 rounded-full px-2 font-semibold shadow">
        <TbSquareRoundedPlusFilled className="text-green-600" size={15} />
      </div>
    </div>
  );  
};

export default CreditButton;
