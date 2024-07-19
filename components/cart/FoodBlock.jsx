import { db } from "@/firebase/config";
import useCartStore from "@/hooks/useCartStore";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import { VscLoading } from "react-icons/vsc";

const FoodBlock = ({ id, count }) => {
  const [product, setProduct] = useState({});
  const [load, setLoad] = useState(true);
  const { increaseQuantity, decreaseQuantity, removeProduct } = useCartStore();

  useEffect(() => {
    getProductData(id);
  }, []);

  const getProductData = async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        setProduct(data);
        setLoad(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (load) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between rounded-lg bg-dark-100 p-3 shadow">
        <div className="flex h-14 gap-3">
          <Image
            src={product.imgSrc}
            width={80}
            height={80}
            className="h-full w-auto rounded-lg"
            alt={id}
          />
          <div className="flex flex-col py-2">
            <h5 className="text-sm font-extralight">{product?.name}</h5>
            <span className="font-medium">₹ {product?.price}.00</span>
          </div>
        </div>
        <div className="flex h-full flex-col items-end gap-3">
          <button onClick={() => removeProduct(id)}>
            <IoIosCloseCircle size={20} className="text-primary" />
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => decreaseQuantity(id)}
              className="h-fit text-neutral-100"
            >
              <MdIndeterminateCheckBox size={23} />
            </button>
            <span className="tabular-nums">{count}</span>
            <button
              onClick={() => increaseQuantity(id)}
              className="h-fit text-neutral-100"
            >
              <MdAddBox size={23} />
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default FoodBlock;
