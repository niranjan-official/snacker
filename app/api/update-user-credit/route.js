import { db } from "@/firebase/config";
import {
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { userId, orderId, amount } = data;
  try {
    const batch = writeBatch(db);

    const nycRef = doc(db, "payments", orderId);
    batch.set(nycRef, {
      userId: userId,
      orderId: orderId,
      amount: amount,
      timeStamp: serverTimestamp(),
    });

    const sfRef = doc(db, "users", userId);
    batch.update(sfRef, {
      credit: increment(parseInt(amount)),
    });

    await batch.commit();
    return NextResponse.json({
      success: true,
      message: "Payment successfull",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
