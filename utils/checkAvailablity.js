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
    if(data.success){
        return true;
    }else{
        console.log(data.error);
    }
  } catch (error) {
    console.log(error.message);
  }
};
