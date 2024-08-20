"use client";
import React, { useEffect, useState } from "react";
import { RiHome2Fill } from "react-icons/ri";
import { RiChatHistoryFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useSnackerStore from "@/hooks/useSnackerStore";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/firebase/config";
import UpdationBlock from "./UpdationBlock";
import { RiShoppingCartFill } from "react-icons/ri";

const Tab = () => {
  const path = usePathname();
  const { products } = useSnackerStore();
  const [hasProducts, setHasProducts] = useState(false);
  const [onUpdation, setOnUpdation] = useState(false);

  useEffect(() => {
    setHasProducts(products.length > 0);
  }, [products]);

  useEffect(() => {
    try {
      const starCountRef = ref(rtdb, "/onStockUpdation/status");
      onValue(starCountRef, (snapshot) => {
        const isUpdating = snapshot.val();
        if (isUpdating) {
          setOnUpdation(true);
        } else {
          setOnUpdation(false);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-evenly border-t border-dark-200 bg-dark-100 p-2 py-1">
      <Link
        href={"/"}
        className={`rounded-lg p-2 py-1 ${path === "/" ? "text-white" : "text-primary/70"}`}
      >
        <RiHome2Fill size={20} />
        <UpdationBlock onUpdation={onUpdation} />
      </Link>
      <Link
        href={"/cart"}
        className={`relative rounded-lg p-2 ${path === "/cart" ? "text-white" : "text-primary/70"}`}
      >
        <RiShoppingCartFill size={20} />
        {hasProducts && path !== "/cart" && (
          <div className="absolute right-1 top-1 h-3 w-3 rounded-full border border-primary bg-red-600"></div>
        )}
      </Link>
      <Link
        href={"/orders"}
        className={`rounded-lg p-2 ${path === "/orders" ? "text-white" : "text-primary/70"}`}
      >
        <RiChatHistoryFill size={20} />
      </Link>
    </div>
  );
};

export default Tab;
