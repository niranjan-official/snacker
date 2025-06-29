import useSnackerStore from "@/hooks/useSnackerStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div 
      className="relative flex w-full flex-col rounded-lg bg-[#1f1e1e] p-2 text-neutral-100 shadow"
      whileHover={{ 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="aspect-square w-full rounded-md bg-gray-600 overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Image
          src={imgSrc}
          width={200}
          height={200}
          className="h-full w-auto rounded-md"
          alt={productId}
        />
      </motion.div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${inter.className} mt-2`}>{name}</h3>
          <h5 className="mb-1 text-xs leading-3 text-neutral-300">
            {subtitle}
          </h5>
          <span className="font-semibold">₹ {price}.00</span>
        </div>
        <motion.button
          onClick={addToCart}
          className="h-fit rounded-md bg-primary p-1 hover:bg-primary/70"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { duration: 0.1 }
          }}
        >
          <FaCartPlus className="text-dark-200" size={20} />
        </motion.button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="mt-2 bg-yellow-400 py-1">Buy Now</Button>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="border-0 bg-dark-100 py-4 text-neutral-50 outline-none">
          <DialogHeader>
            <div className="flex w-full items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={imgSrc}
                  width={300}
                  height={300}
                  className="h-auto w-1/2 rounded-2xl bg-dark-200"
                />
              </motion.div>
              <div className="flex flex-col text-left">
                <h5>{name}</h5>
                <p>₹{price * count}.00</p>
                <span className="mt-2">Select quantity</span>
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={() => setCount(count > 1 ? count - 1 : count)}
                    className="h-fit text-neutral-100"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <MdIndeterminateCheckBox size={23} />
                  </motion.button>
                  <motion.span 
                    className="tabular-nums"
                    key={count}
                    initial={{ scale: 1.2, color: "#fbbf24" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ duration: 0.2 }}
                  >
                    {count}
                  </motion.span>
                  <motion.button
                    onClick={() =>
                      setCount(count < 4 && count < stock ? count + 1 : count)
                    }
                    className="h-fit text-neutral-100"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <MdAddBox size={23} />
                  </motion.button>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={buyProduct}
                    className="mt-2 bg-yellow-400 py-2 disabled:bg-yellow-400/70"
                    loading={buttonLoad}
                  >
                    Pay Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <motion.div 
        className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-green-600 text-center text-sm font-semibold text-white shadow"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 0.3,
          type: "spring",
          stiffness: 200
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        {stock}
      </motion.div>
      <OrderSuccessBlock open={openOrder} setOpen={setOpenOrder} data={data} />
    </motion.div>
  );
};

export default FoodItem;
