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
import { processPayment } from "@/utils/processPayment";
import { updateReservation } from "@/utils/updateReservation";
import { cancelReservation } from "@/utils/cancelReservation";
import OrderSuccessBlock from "@/components/shared/OrderSuccessBlock";
import { createNewOrder } from "@/utils/createNewOrder";
import { TiShoppingCart } from "react-icons/ti";

const page = () => {
  const { user } = useUser();
  const { products, removeAll } = useCartStore();
  const [amount, setAmount] = useState(0);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [QR, setQR] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + product.price * product.count,
      0,
    );
    setAmount(total);
  }, [products]);

  const purchaseProduct = async () => {
    setButtonLoad(true);
    try {
      // Step 1: Reserve the product
      const reservationResult = await reserveProduct(products);
      console.log("Reservation Result:", reservationResult);
  
      if (!reservationResult.success) {
        console.error("Reservation error:", reservationResult.message);
        setTriggerReload(true);
        return;
      }
  
      // Step 2: Process payment
      try {
        const res = await processPayment(amount, user, products);
        console.log("Payment Result:", res);
  
        if (res && res.ok) {
          // Payment was successful
          setQR(res.orderId);
          // await createNewOrder(res.orderId, products, user, amount);
          setData({ orderId: res.orderId, amount });
          removeAll();
          setOpen(true);
        } else {
          // Handle the case where processPayment indicates failure
          console.log("Payment not successful.");
        }
      } catch (error) {
        // Error during payment processing
        console.error("Error during payment processing:", error.message);
      }
    } catch (error) {
      // Error during reservation process
      console.error("Error during reservation process:", error.message);
    } finally {
      setButtonLoad(false);
    }
  };

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
        {products.length > 0 && (
          <div className="mt-6 flex w-full flex-col border-b pb-4">
            <div className="flex w-full justify-between">
              <span>Total Amount :</span>
              <span>₹ {amount} INR</span>
            </div>
            <button
              disabled={buttonLoad}
              onClick={purchaseProduct}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary p-3 font-bold text-dark-200 shadow hover:bg-primary/60 disabled:bg-primary/70"
            >
              {buttonLoad ? (
                <VscLoading
                  size={20}
                  className="animate-spin text-dark-200/70"
                />
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        )}
        <div className="mt-8 flex flex-col gap-5">
          {products.length > 0 ? (
            products.map((product) => (
              <FoodBlock
                key={product.productId}
                id={product.productId}
                count={product.count}
                triggerReload={triggerReload}
                setTriggerReload={setTriggerReload}
              />
            ))
          ) : (
            <div className="mt-4 flex w-full flex-col items-center py-3 text-neutral-50/50">
              <TiShoppingCart size={50} />
              <p className="mt-2 text-center text-3xl font-extrabold">
                Cart is Empty
              </p>
            </div>
          )}
        </div>
      </div>

      <OrderSuccessBlock open={open} setOpen={setOpen} QR={QR} data={data} />
    </div>
  );
};

export default page;
