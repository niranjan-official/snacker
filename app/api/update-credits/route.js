import { db } from "@/firebase/config";
import {
  doc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req) {
  const data = await req.json();

  const razorpaySignature = req.headers.get("x-razorpay-signature");
  if (!razorpaySignature) {
    console.log("Signature missing");
    return NextResponse.json({
      success: false,
      error: "Signature missing",
    });
  }
  const isValid = validateWebhookSignature(
    JSON.stringify(data),
    razorpaySignature,
    process.env.RAZORPAY_WEBHOOK_SECRET,
  );
  if (!isValid) {
    console.log("Not Valid");
    return NextResponse.json({
      success: false,
      error: "Not Valid",
    });
  }

  const { order_id: orderId, amount } = data.payload.payment.entity;
  const userId = data.payload.payment.entity.notes.userId;

  try {
    const batch = writeBatch(db);

    const paymentRef = doc(db, "payments", orderId);
    batch.set(paymentRef, {
      userId: userId,
      orderId: orderId,
      amount: amount / 100, // Amount in INR
      timeStamp: serverTimestamp(),
    });

    const userRef = doc(db, "users", userId);
    batch.update(userRef, {
      credit: increment(amount / 100),
    });

    await batch.commit();
    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
