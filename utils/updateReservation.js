export const updateReservation = async (products, orderId) => {
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
