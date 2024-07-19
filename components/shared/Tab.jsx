"use client";
import React from "react";
import { RiHome2Fill } from "react-icons/ri";
import { BsFillBagHeartFill } from "react-icons/bs";
import { RiChatHistoryFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Tab = () => {
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 flex h-16 w-full items-center justify-evenly bg-dark-100 p-2 border-t border-dark-200">
      <Link
        href={"/"}
        className={`rounded-lg p-2 ${path === "/" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <RiHome2Fill size={20} />
      </Link>
      <Link
        href={"/cart"}
        className={`rounded-lg p-2 ${path === "/cart" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <BsFillBagHeartFill size={20} />
      </Link>
      <Link
        href={"#"}
        className={`rounded-lg p-2 ${path === "/settings" ? "bg-primary text-dark-200" : "text-primary"}`}
      >
        <RiChatHistoryFill size={20} />
      </Link>
    </div>
  );
};

export default Tab;
