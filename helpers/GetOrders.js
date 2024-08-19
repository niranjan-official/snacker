import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export const getOrders = async (userId) => {
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
