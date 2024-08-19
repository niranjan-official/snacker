import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import useCartStore from "./useCartStore";
import { checkAvailablity } from "@/utils/checkAvailablity";
import { createOrder } from "@/utils/createOrder";
import { useToast } from "@/components/ui/use-toast";

const usePurchaseProduct = () => {
  console.log("Hook re rendered");
  
  const { user } = useUser();
  const { updateCredit, removeAll } = useCartStore();
  const [buttonLoad, setButtonLoad] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const { toast } = useToast();

  const purchaseProduct = async (products, amount, type = "normal") => {

    setButtonLoad(true);
    try {
      const available = await checkAvailablity(products, user?.id, amount);
      if (available.success) {
        setOpen(true);
        const res = await createOrder(products, user?.id, amount);
        if (res.success) {
          setData({ orderId: res.orderId, amount });
          updateCredit(-amount);
          if (type === "cart") removeAll();
        } else {
          toast({
            title: "Error Occured",
            description: res.error,
            variant: "destructive",
          });
        }
      } else if (available.insufficientCredit) {
        toast({
          title: "Insufficient Wallet Balance",
          description: "Please recharge your wallet to proceed with the order.",
          variant: "destructive",
        });
        setOpenWallet(true);
      } else if (available.insufficientStock) {
        toast({
          title: "Out of Stock",
          description: "This product is currently out of stock.",
          variant: "destructive",
        });
        if (type === "cart") setTriggerReload(true);
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
      console.error("Error during reservation process:", error.message);
      toast({
        title: "Error Occured",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setButtonLoad(false);
    }
  };

  return {
    purchaseProduct,
    buttonLoad,
    data,
    open,
    setOpen,
    openWallet,
    setOpenWallet,
    triggerReload,
    setTriggerReload
  };
};

export default usePurchaseProduct;
