"use client";
import React, { useEffect, useState } from "react";
import useSnackerStore from "@/hooks/useSnackerStore";
import FoodBlock from "@/components/cart/FoodBlock";
import OrderSuccessBlock from "@/components/shared/OrderSuccessBlock";
import { TiShoppingCart } from "react-icons/ti";
import { useToast } from "@/components/ui/use-toast";
import CreditWallet from "@/components/shared/CreditWallet";
import usePurchaseProduct from "@/hooks/usePurchaseProduct";
import CartNotch from "@/components/cart/CartNotch";
import Button from "@/components/shared/Button";

const page = () => {
  const { products } = useSnackerStore();
  const {
    purchaseProduct,
    buttonLoad,
    data,
    openOrder,
    setOpenOrder,
    triggerReload,
    setTriggerReload,
  } = usePurchaseProduct();
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + product.price * product.count,
      0,
    );
    setAmount(total);
  }, [products]);

  const buyProduct = async () => {
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

    purchaseProduct(products, amount, "cart");
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between p-6 pb-20">
      <div>
        <CartNotch />
        {products.length > 0 && (
          <div className="mt-6 flex w-full flex-col border-b pb-4">
            <div className="flex w-full justify-between">
              <span>Total Amount :</span>
              <span>₹ {amount} INR</span>
            </div>
            <Button
              onClick={buyProduct}
              className="bg-yellow-400 disabled:bg-yellow-400/70 mt-2"
              loading={buttonLoad}
            >
              Pay Now
            </Button>
          </div>
        )}
        <div className="mt-5 flex flex-col gap-5">
          {products?.length > 0 ? (
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
      <CreditWallet />
      <OrderSuccessBlock open={openOrder} setOpen={setOpenOrder} data={data} />
    </div>
  );
};

export default page;
