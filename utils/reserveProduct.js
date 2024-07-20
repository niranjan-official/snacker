export const reserveProduct = async (products) => {
  try {
    const res = await fetch(`/api/reserve-product`, {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log("Reservation successful");
      return { success: true };
    } else {
      console.error(data.message || "Reservation failed");
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Error reserving products:", error.message);
    alert("Error reserving products. Please try again.");
    return { success: false, message: e.message };
  }
};
