export const createOrder = async (products, userId, amount) => {
  try {
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ products, userId, amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      return { success: true, orderId: data.orderId };
    } else {
      console.log(data.error);
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};
