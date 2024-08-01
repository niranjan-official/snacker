import { createOrderId } from "./createOrderId";

export const processPayment = async (amount, user) => {
  return new Promise((resolve, reject) => {
    createOrderId(amount)
      .then((orderId) => {
        if (!orderId) {
          return reject(new Error("Failed to create order ID"));
        }

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
                return resolve({ ok: true, orderId });
              } else {
                throw new Error("Payment verification failed");
              }
            } catch (error) {
              console.error("Error verifying payment:", error.message);
              return reject(error);
            }
          },
          prefill: {
            name: user?.username || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
          },
          theme: {
            color: "#0D0D0D",
          },
          modal: {
            ondismiss: async function () {
              return reject(new Error("Payment was closed by the user"));
            },
          },
          retry: {
            enabled: false,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", async function (response) {
          alert(response.error.description);
          return reject(new Error("Payment failed"));
        });
        paymentObject.open();
      })
      .catch(async (error) => {
        console.error("Error creating order ID:", error.message);
        return reject(error);
      });
  }).catch(async (error) => {
    throw error;
  });
};
