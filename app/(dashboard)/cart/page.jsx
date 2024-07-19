"use client";
import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import BackButton from "@/components/cart/BackButton";
import useCartStore from "@/hooks/useCartStore";
import FoodBlock from "@/components/cart/FoodBlock";
import { VscLoading } from "react-icons/vsc";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";
import { reserveProduct } from "@/utils/reserveProduct";

const page = () => {
  const { user } = useUser();
  const { products } = useCartStore();
  const [amount, setAmount] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + product.price * product.count,
      0,
    );
    setAmount(total);
  }, [products]);

  return (
    <div className="flex min-h-screen w-full flex-col justify-between p-6 pb-20">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div>
        <div className="flex items-center justify-between">
          <BackButton />
          <FaBagShopping
            size={30}
            className="rounded-md bg-dark-100 p-2 text-primary"
          />
        </div>
        <div className="mt-8 flex flex-col gap-5">
          {products[0] ? (
            products.map((product, index) => (
              <FoodBlock
                key={index}
                id={product.productId}
                count={product.count}
              />
            ))
          ) : (
            <p>Cart is Empty</p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full justify-between">
          <span>Total Amount :</span>
          <span>₹ {amount} INR</span>
        </div>
        <button
          disabled={load}
          onClick={() => reserveProduct(products, setLoad, amount, user)}
          className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary p-3 font-bold text-dark-200 shadow hover:bg-primary/60 disabled:bg-primary/70"
        >
          {load ? (
            <VscLoading size={20} className="animate-spin text-dark-200/70" />
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
};

export default page;
