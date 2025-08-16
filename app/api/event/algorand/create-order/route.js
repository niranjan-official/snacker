import Razorpay from 'razorpay';
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, name, regNo, hasRegNo, year, batch, foodPreference, amount } = data;

    // Quick validation
    if (!email || !name || !amount) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
      }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({
        success: false,
        error: "Invalid amount",
      }, { status: 400 });
    }

    const amountInPaise = Math.round(amount);

    // Create Razorpay order with optimized options
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `algorand_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      notes: {
        email,
        name,
        regNo: regNo || '',
        hasRegNo,
        year,
        batch,
        foodPreference,
        eventType: 'algorand',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: amountInPaise,
      message: "Order created successfully",
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    
    // Better error handling
    if (error.error && error.error.description) {
      return NextResponse.json({
        success: false,
        error: error.error.description,
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: false,
      error: "Failed to create payment order",
    }, { status: 500 });
  }
}
