import { createNewOrder } from "./createNewOrder";

export const updateReservation = async (orderId, products, user, amount) => {
  try {
    const [updationStatus, orderStatus] = await Promise.all([
      updation(products),
      createNewOrder(orderId, products, user, amount),
    ]);
    if (updationStatus.success && orderStatus.success) {
      return { success: true };
    } else {
      return { success: false, error: "unknown" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updation = async (products) => {
  try {
    const res = await fetch(`/api/update-reservation`, {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log("Reservation Updated Successfully");
      return { success: true };
    } else {
      console.error(data.message || "Reservation Updation Failed");
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error Updating products:", error.message);
    alert("Error Updating products. Please try again.");
    return { success: false, message: e.message };
  }
};
