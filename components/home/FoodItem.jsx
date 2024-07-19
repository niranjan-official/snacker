import useCartStore from "@/hooks/useCartStore";
import Image from "next/image";
import React, { useState } from "react";
import {
  MdAddBox,
  MdIndeterminateCheckBox,
  MdOutlineAdd,
} from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VscLoading } from "react-icons/vsc";

const FoodItem = ({ productId, name, price, stock, imgSrc }) => {
  const { addProduct } = useCartStore();
  const [count, setCount] = useState(1);
  const [load, setLoad] = useState(false);

  const reserveProduct = async () => {
    setLoad(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/reserve-product`,
        {
          method: "POST",
          body: JSON.stringify([{
            productId: productId,
            count: count
          }]),
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (res.ok) {
        console.log("Successfull");
      }
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  return (
    <div className="relative flex w-[calc(50%-0.5rem)] flex-col rounded-lg bg-dark-100 p-2 text-neutral-100 shadow">
      <div className="aspect-square w-full bg-gray-600">
        <Image
          src={imgSrc}
          width={200}
          height={200}
          className="h-full w-auto"
          alt={productId}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mt-2">{name}</h3>
          <span className="font-semibold">₹ {price}.00</span>
        </div>
        <button
          onClick={() => addProduct(productId, 1, price)}
          className="h-fit rounded-md bg-primary p-1 hover:bg-primary/70"
        >
          <MdOutlineAdd className="text-dark-200" size={20} />
        </button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-2 w-full rounded-md bg-primary p-1 font-bold text-dark-200 hover:bg-primary/70">
            Buy Now
          </button>
        </DialogTrigger>
        <DialogContent className="border-0 bg-dark-100 text-neutral-50 outline-none">
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
                  disabled={load}
                  onClick={reserveProduct}
                  className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary p-3 py-2 font-bold text-dark-200 shadow hover:bg-primary/60 disabled:bg-primary/70"
                >
                  {load ? (
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
    </div>
  );
};

export default FoodItem;
