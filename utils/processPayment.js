import { cancelReservation } from "./cancelReservation";
import { createNewOrder } from "./createNewOrder";
import { createOrderId } from "./createOrderId";
import { updateReservation } from "./updateReservation";

export const processPayment = (amount, user, products) => {
  return new Promise((resolve, reject) => {
    createOrderId(amount)
      .then((orderId) => {
        if (!orderId) {
          throw new Error("Failed to create order ID");
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
          amount: parseFloat(amount) * 100,
          currency: "INR",
          name: "Snacker",
          description: "Vend your snacks",
          order_id: orderId,
          notes: {
            user_id: user?.id || "",
          },
          handler: async function (response) {
            try {
              const result = await fetch("/api/verify", {
                method: "POST",
                body: JSON.stringify({
                  orderCreationId: orderId,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                }),
                headers: { "Content-Type": "application/json" },
              });

              const res = await result.json();
              if (res.isOk) {
                await updateReservation(products, orderId);
                resolve({ ok: true, orderId });
              } else {
                reject(new Error("Payment verification failed"));
              }
            } catch (error) {
              console.error("Error verifying payment:", error.message);
              reject(error);
            }
          },
          prefill: {
            name: user?.username || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async function () {
              await cancelReservation(products);
              reject(new Error("Payment was closed by the user"));
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", async function (response) {
          alert(response.error.description);
          await cancelReservation(products);
          reject(new Error("Payment failed"));
        });

        paymentObject.open();
      })
      .catch((error) => {
        console.error("Error during payment process:", error.message);
        reject(error);
      });
  });
};
