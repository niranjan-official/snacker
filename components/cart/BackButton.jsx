"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
  const Router = useRouter();

  return (
    <button onClick={() => Router.push("/")}>
      <IoMdArrowBack size={30} className="text-primary" />
    </button>
  );
};

export default BackButton;
