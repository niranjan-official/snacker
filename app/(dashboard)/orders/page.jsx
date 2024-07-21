import BackButton from "@/components/cart/BackButton";
import OrderBlock from "@/components/orders/OrderBlock";
import { db } from "@/firebase/config";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React from "react";
import { FaListAlt } from "react-icons/fa";

export const revalidate = 0;

const getOrders = async (userId) => {
  try {
    let orders = [];
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("timeStamp", "desc"),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      orders.push({ id: doc.id, ...data });
    });
    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const page = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId);

  return (
    <div className="flex min-h-screen w-full flex-col p-6 pb-20">
      <div className="flex items-center justify-between">
        <BackButton />
        <FaListAlt
          size={30}
          className="rounded-md bg-dark-100 p-2 text-primary"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl">Orders List</h3>
        <hr className="mt-2" />
      </div>
      <div className="mt-6 flex w-full flex-col gap-5">
        {orders.length > 0 ? (
          orders?.map((order, index) => (
            <OrderBlock
              key={index}
              id={order.id}
              amount={order.amount}
              status={order.status}
              timeStamp={order.timeStamp}
              products={order.products}
            />
          ))
        ) : (
          <div className="mt-4 flex w-full flex-col items-center py-3 text-neutral-50/50">
            <p className="mt-2 text-center text-3xl font-extrabold">
              No orders found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
