"use client";
import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import CreditBlock from "../shared/CreditBlock";
import useCartStore from "@/hooks/useCartStore";
import { Skeleton } from "../ui/skeleton";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

const Credit = ({userId}) => {

  const [open, setOpen] = useState(false);
  const { credit: storedCredit, setCredit } = useCartStore();
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
