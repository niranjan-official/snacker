export const checkAvailablity = async (products, userId, amount) => {
  try {
    const res = await fetch("/api/check-availability", {
      method: "POST",
      body: JSON.stringify({ products, userId, amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      return { success: true };
    } else if (data.insufficientCredit) {
      return { success: false, insufficientCredit: true };
    } else if (data.insufficientStock) {
      return { success: false, insufficientStock: true };
    } else {
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
};
