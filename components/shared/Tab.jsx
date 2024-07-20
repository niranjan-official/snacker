"use client";
import React from "react";
import { RiHome2Fill } from "react-icons/ri";
import { BsFillBagHeartFill } from "react-icons/bs";
import { RiChatHistoryFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useCartStore from "@/hooks/useCartStore";

const Tab = () => {
  const path = usePathname();
  const { products } = useCartStore();

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-evenly border-t border-dark-200 bg-dark-100 p-2">
      <Link
        href={"/"}
        className={`rounded-lg p-2 ${path === "/" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <RiHome2Fill size={20} />
      </Link>
      <Link
        href={"/cart"}
        className={`relative rounded-lg p-2 ${path === "/cart" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <BsFillBagHeartFill size={20} />
        {
          (products[0] && path !== '/cart') && (
            <div className="absolute right-1 top-1 size-3 rounded-full border border-primary bg-red-600"></div>
          )
        }
      </Link>
      <Link
        href={"/orders"}
        className={`rounded-lg p-2 ${path === "/orders" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <RiChatHistoryFill size={20} />
      </Link>
    </div>
  );
};

export default Tab;
