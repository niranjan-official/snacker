import Image from "next/image";
import React from "react";
import { MdOutlineAdd } from "react-icons/md";

const FoodItem = ({ name, price, stock, imgSrc }) => {
  return (
    <div className="relative flex w-[calc(50%-0.5rem)] flex-col rounded-lg bg-dark-100 p-2 text-neutral-100 shadow">
      <div className="aspect-square w-full bg-gray-600">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          className="h-full w-auto"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mt-2">{name}</h3>
          <span className="font-semibold">₹ {price}.00</span>
        </div>
        <button className="h-fit rounded-md bg-primary p-1">
          <MdOutlineAdd className="text-dark-200" size={20} />
        </button>
      </div>
      <button className="mt-2 w-full rounded-md bg-primary p-1 font-bold text-dark-200">
        Buy Now
      </button>
      <div className="absolute -right-2 -top-2 rounded-full bg-green-600 px-2 font-semibold text-white shadow">
        {stock}
      </div>
    </div>
  );
};

export default FoodItem;
