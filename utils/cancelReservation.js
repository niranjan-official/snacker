export const cancelReservation = async (products) => {
  try {
    const res = await fetch(`/api/cancel-reservation`, {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log("Reservation Cancelled Successfully");
      return { success: true };
    } else {
      console.error(data.message || "Reservation Cancellation Failed");
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error cancelling products:", error.message);
    alert("Error cancelling products. Please try again.");
    return { success: false, message: e.message };
  }
};
