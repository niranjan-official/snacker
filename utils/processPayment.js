import { createOrderId } from "./createOrderId";

export const processPayment = async (amount, user) => {
    try {
      const orderId = await createOrderId(amount);
      if (!orderId) return;
  
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: "INR",
        name: "Snacker",
        description: "Vend your snacks",
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
  
          try {
            const result = await fetch("/api/verify", {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            });
            const res = await result.json();
            if (res.isOk) {
              alert("Payment successful");
            } else {
              alert(res.message);
            }
          } catch (error) {
            console.error("Error verifying payment:", error.message);
          }
        },
        prefill: {
          name: user?.username || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error processing payment:", error.message);
    }
  };
  