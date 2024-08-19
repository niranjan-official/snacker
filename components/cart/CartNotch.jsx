import React from "react";
import BackButton from "./BackButton";
import { FaBagShopping } from "react-icons/fa6";

const CartNotch = () => {
  return (
    <div className="flex items-center justify-between">
      <BackButton />
      <FaBagShopping
        size={30}
        className="rounded-md bg-dark-100 p-2 text-primary"
      />
    </div>
  );
};

export default CartNotch;
