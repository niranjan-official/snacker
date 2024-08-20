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
          notes: {
            userId: user.id,
          },
          handler: async function (response) {
            return resolve({ ok: true, orderId });
          },
          prefill: {
            name: user?.username || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
          },
          theme: {
            color: "#0D0D0D",
          },
          retry: {
            enabled: false,
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", async function (response) {
          return reject(new Error("Payment failed"));
        });
        paymentObject.open();
      })
      .catch(async (error) => {
        console.error("Error creating order ID:", error.message);
        return reject(error);
      });
  });
};
