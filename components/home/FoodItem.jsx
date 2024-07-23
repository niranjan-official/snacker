import useCartStore from "@/hooks/useCartStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MdAddBox,
  MdIndeterminateCheckBox,
  MdOutlineAdd,
} from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VscLoading } from "react-icons/vsc";
import { useUser } from "@clerk/nextjs";
import { reserveProduct } from "@/utils/reserveProduct";
import Script from "next/script";
import OrderSuccessBlock from "../shared/OrderSuccessBlock";
import { processPayment } from "@/utils/processPayment";
import { useToast } from "../ui/use-toast";
import { updateReservation } from "@/utils/updateReservation";
import { cancelReservation } from "@/utils/cancelReservation";

const FoodItem = ({ productId, name, price, stock, imgSrc, position }) => {
  const { user } = useUser();
  const { addProduct, removeAll } = useCartStore();
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState(0);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [QR, setQR] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAmount(price * count);
  }, [count]);

  const purchaseProduct = async () => {
    setButtonLoad(true);
    const products = [
      {
        productId,
        count,
        price,
        name,
        position,
      },
    ];

    let reservationResult;
    try {
      reservationResult = await reserveProduct(products);
      if (!reservationResult.success) {
        throw new Error(reservationResult.message);
      }
      const paymentResult = await processPayment(amount, user, products);
      setOpen(true);
      if (paymentResult && paymentResult.ok) {
        const updation = await updateReservation(
          paymentResult.orderId,
          products,
          user,
          amount,
        );
        if (updation.success) {
          setQR(paymentResult.orderId);
          setData({ orderId: paymentResult.orderId, amount });
        } else {
          toast({
            title: "Updation Failed",
            description: updation.message,
            variant: "destructive",
          });
        }
      } else {
        throw new Error("Payment not successful.");
      }
    } catch (error) {
      console.error("Error during purchase process:", error.message);
      if (!reservationResult || !reservationResult.success) {
        toast({
          title: "Stock Unavailable",
          description:
            "Requested quantity exceeds stock. Please refresh the page and adjust your order.",
          variant: "destructive",
        });
      }
    } finally {
      setButtonLoad(false);
    }
  };

  const addToCart = () => {
    console.log("called");
    addProduct(productId, 1, price, name, position, stock);
    toast({
      title: "Added To Cart",
      description: `${name} has been added to your cart`,
      className: "bg-primary text-black",
    });
  };

  return (
    <div className="relative flex w-[calc(50%-0.5rem)] flex-col rounded-lg bg-dark-100 p-2 text-neutral-100 shadow">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="aspect-square w-full bg-gray-600 rounded-md">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          className="h-full w-auto rounded-md"
          alt={productId}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mt-2">{name}</h3>
          <span className="font-semibold">₹ {price}.00</span>
        </div>
        <button
          onClick={addToCart}
          className="h-fit rounded-md bg-primary p-1 hover:bg-primary/70"
        >
          <MdOutlineAdd className="text-dark-200" size={20} />
        </button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-2 w-full rounded-md bg-yellow-400 p-1 font-bold text-dark-200 hover:bg-primary/70">
            Buy Now
          </button>
        </DialogTrigger>
        <DialogContent className="border-0 bg-dark-100 py-4 text-neutral-50 outline-none">
          <DialogHeader>
            <div className="flex w-full items-center gap-3">
              <Image
                src={imgSrc}
                width={300}
                height={300}
                className="h-auto w-1/2 rounded-2xl bg-dark-200"
              />
              <div className="flex flex-col text-left">
                <h5>{name}</h5>
                <p>₹{price * count}.00</p>
                <span className="mt-2">Select quantity</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCount(count > 1 ? count - 1 : count)}
                    className="h-fit text-neutral-100"
                  >
                    <MdIndeterminateCheckBox size={23} />
                  </button>
                  <span className="tabular-nums">{count}</span>
                  <button
                    onClick={() => setCount(count < stock ? count + 1 : count)}
                    className="h-fit text-neutral-100"
                  >
                    <MdAddBox size={23} />
                  </button>
                </div>
                <button
                  disabled={buttonLoad}
                  onClick={purchaseProduct}
                  className="mt-2 flex w-full items-center justify-center rounded-lg bg-yellow-400 p-3 py-2 font-bold text-dark-200 shadow hover:bg-primary/60 disabled:bg-primary/70"
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
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="absolute -right-2 -top-2 rounded-full bg-green-600 px-2 font-semibold text-white shadow">
        {stock}
      </div>
      <OrderSuccessBlock open={open} setOpen={setOpen} QR={QR} data={data} />
    </div>
  );
};

export default FoodItem;
