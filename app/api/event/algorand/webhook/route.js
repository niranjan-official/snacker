import { db } from "@/firebase/config";
import {
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req) {
  const data = await req.json();

  const razorpaySignature = req.headers.get("x-razorpay-signature");
  if (!razorpaySignature) {
    console.log("Algorand Event: Signature missing");
    return NextResponse.json({
      success: false,
      error: "Signature missing",
    });
  }

  const isValid = validateWebhookSignature(
    JSON.stringify(data),
    razorpaySignature,
    process.env.RAZORPAY_API_KEY_SECRET,
  );
  
  if (!isValid) {
    console.log("Algorand Event: Invalid Signature");
    return NextResponse.json({
      success: false,
      error: "Invalid Signature",
    });
  }

  const { order_id: orderId, amount } = data.payload.payment.entity;
  const notes = data.payload.payment.entity.notes;
  const email = notes.email;

  try {
    // Optimized: Single database operation for status update
    const success = await updateStudentPaymentStatusOptimized(email);
    
    if (!success) {
      throw new Error("Failed to update student payment status");
    }

    return NextResponse.json({
      success: true,
      message: "Algorand event payment processed successfully",
    });
  } catch (error) {
    console.error("Error processing Algorand event payment:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

const updateStudentPaymentStatusOptimized = async (email) => {
  try {
    // Single query to find student document
    const q = query(
      collection(db, "algorand-students"),
      where("email", "==", email)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.error("Student not found:", email);
      return false;
    }

    const studentDoc = querySnapshot.docs[0];
    const studentRef = doc(db, "algorand-students", studentDoc.id);

    // Direct update without transaction overhead
    await updateDoc(studentRef, { 
      payment_status: 'success',
      updatedAt: serverTimestamp(),
    });

    console.log("Payment status updated successfully for:", email);
    return true;
  } catch (error) {
    console.error("Error updating student payment status:", error);
    return false;
  }
};
