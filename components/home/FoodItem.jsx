import useSnackerStore from "@/hooks/useSnackerStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderSuccessBlock from "../shared/OrderSuccessBlock";
import { FaCartPlus } from "react-icons/fa";
import { Inter } from "next/font/google";
import usePurchaseProduct from "@/hooks/usePurchaseProduct";
import { useToast } from "../ui/use-toast";
import Button from "../shared/Button";

const inter = Inter({ subsets: ["latin"] });

const FoodItem = ({
  productId,
  name,
  price,
  stock,
  imgSrc,
  position,
  subtitle,
}) => {
  const { addProduct, openCreditWallet } = useSnackerStore();
  const { purchaseProduct, buttonLoad, data, openOrder, setOpenOrder } =
    usePurchaseProduct();
  const [count, setCount] = useState(1);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setAmount(price * count);
  }, [count]);

  useEffect(() => {
    if (openCreditWallet) setOpen(false);
  }, [openCreditWallet]);

  const buyProduct = async () => {
    const products = [
      {
        productId,
        count,
        price,
        name,
        subtitle,
        position,
      },
    ];
    purchaseProduct(products, amount);
  };

  const addToCart = () => {
    addProduct(productId, 1, price, name, position, subtitle);
    toast({
      title: "Added To Cart",
      description: `${name} has been added to your cart`,
      className: "bg-primary text-black",
    });
  };

  return (
    <div className="relative flex w-full flex-col rounded-lg bg-[#1f1e1e] p-2 text-neutral-100 shadow">
      <div className="aspect-square w-full rounded-md bg-gray-600">
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
          <h3 className={`${inter.className} mt-2`}>{name}</h3>
          <h5 className="mb-1 text-xs leading-3 text-neutral-300">
            {subtitle}
          </h5>
          <span className="font-semibold">₹ {price}.00</span>
        </div>
        <button
          onClick={addToCart}
          className="h-fit rounded-md bg-primary p-1 hover:bg-primary/70"
        >
          <FaCartPlus className="text-dark-200" size={20} />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2 bg-yellow-400 py-1">Buy Now</Button>
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
                    onClick={() =>
                      setCount(count < 4 && count < stock ? count + 1 : count)
                    }
                    className="h-fit text-neutral-100"
                  >
                    <MdAddBox size={23} />
                  </button>
                </div>
                <Button
                  onClick={buyProduct}
                  className="mt-2 bg-yellow-400 py-2 disabled:bg-yellow-400/70"
                  loading={buttonLoad}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-green-600 text-center text-sm font-semibold text-white shadow">
        {stock}
      </div>
      {
        productId === 'XhwXxH68y7qERlAIYyFC' && (
          <div className="absolute -top-1 -left-2">
            <Image src={'/discount_badge.png'} width={100} height={100} />
          </div>
        )
      }
      <div></div>
      <OrderSuccessBlock open={openOrder} setOpen={setOpenOrder} data={data} />
    </div>
  );
};

export default FoodItem;
