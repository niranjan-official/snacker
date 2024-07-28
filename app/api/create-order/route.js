import { db } from "@/firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { nanoid } from 'nanoid'

export async function POST(req) {
  const data = await req.json();
  const { products, userId, amount } = data;
  const orderId = nanoid();
  try {
    await setDoc(doc(db, "orders", orderId.toString()), {
      userId: userId || "",
      products: products,
      amount: amount,
      status: "pending",
      timeStamp: serverTimestamp(),
    });
    return NextResponse.json({
      success: true,
      orderId: orderId,
      message: "Order created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
