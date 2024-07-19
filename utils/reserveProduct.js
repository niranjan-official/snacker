import { processPayment } from "./processPayment";

export const reserveProduct = async (products, setLoad, amount, user) => {
  setLoad(true);
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
      await processPayment(amount, user);
    } else {
      console.error(data.message || "Reservation failed");
      alert(data.message || "Reservation failed");
    }
  } catch (error) {
    console.error("Error reserving products:", error.message);
    alert("Error reserving products. Please try again.");
  } finally {
    setLoad(false);
  }
};
