"use client";
import React, { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import BackButton from "@/components/cart/BackButton";
import useCartStore from "@/hooks/useCartStore";
import FoodBlock from "@/components/cart/FoodBlock";
import { VscLoading } from "react-icons/vsc";
import { useUser } from "@clerk/nextjs";
import Script from "next/script";
import OrderSuccessBlock from "@/components/shared/OrderSuccessBlock";
import { TiShoppingCart } from "react-icons/ti";
import { useToast } from "@/components/ui/use-toast";
import { checkAvailablity } from "@/utils/checkAvailablity";
import { createOrder } from "@/utils/createOrder";

const page = () => {
  const { user } = useUser();
  const { products, removeAll } = useCartStore();
  const [amount, setAmount] = useState(0);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [QR, setQR] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + product.price * product.count,
      0,
    );
    setAmount(total);
  }, [products]);

  const purchaseProduct = async () => {
    const totalQuantity = products.reduce(
      (acc, product) => acc + product.count,
      0,
    );

    if (totalQuantity > 4) {
      toast({
        title: "Too Many Products",
        description: "You can only purchase a maximum of four items in total.",
        variant: "destructive",
      });
      return;
    }
    setButtonLoad(true);

    try {
      const available = await checkAvailablity(products, user.id, amount);
      if (available.success) {
        setOpen(true);
        const res = await createOrder(products, user.id, amount);
        if (res.success) {
          setQR(res.orderId);
          setData({ orderId: res.orderId, amount });
          updateCredit(-amount);
          removeAll();
        } else {
          toast({
            title: "Order Creation Failed",
            description:
              "There was an issue while creating your order. Please try again.",
            variant: "destructive",
          });
        }
      } else if (available.insufficientCredit) {
        toast({
          title: "Insufficient Wallet Balance",
          description: "Please recharge your wallet to proceed with the order.",
          variant: "destructive",
        });
      } else if (available.insufficientStock) {
        toast({
          title: "Out of Stock",
          description:
            "One or more products in your cart are currently out of stock. Please adjust your cart.",
          variant: "destructive",
        });
        setTriggerReload(true);
      } else {
        toast({
          title: "Error",
          description:
            available.error ||
            "An unknown error occurred. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
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
