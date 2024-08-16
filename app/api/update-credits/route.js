import { db } from "@/firebase/config";
import {
  doc,
  runTransaction,
  serverTimestamp,
  setDoc,
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
    console.log("Invalid Signature");
    return NextResponse.json({
      success: false,
      error: "Invalid Signature",
    });
  }

  const { order_id: orderId, amount } = data.payload.payment.entity;
  const userId = data.payload.payment.entity.notes.userId;
  const amountInINR = amount / 100;

  try {
    await Promise.all([
      updateCredits(userId, amountInINR),
      setDoc(doc(db, "payments", orderId), {
        userId,
        orderId,
        amount: amountInINR,
        timeStamp: serverTimestamp(),
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

const updateCredits = async (userId, amountInINR) => {
  const userRef = doc(db, "users", userId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const newCredit = (userDoc.data().credit || 0) + amountInINR;
      transaction.update(userRef, { credit: newCredit });
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating credits:", error);
    throw new Error("Credit update failed");
  }
};
