import { db } from "@/firebase/config";
import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";

export const createNewOrder = async (orderId, products, user, amount) => {
  try {
    await setDoc(doc(db, "orders", orderId), {
      userId: user?.id || "",
      products: products,
      amount: amount,
      status: 'pending',
      timeStamp: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};
