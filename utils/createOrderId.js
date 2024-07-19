export const createOrderId = async (amount) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
  
      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };
  