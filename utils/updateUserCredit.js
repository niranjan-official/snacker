export const updateUserCredit = async(userId,orderId, amount) =>{
    try {
        const res = await fetch("/api/update-user-credit", {
          method: "POST",
          body: JSON.stringify({userId, orderId, amount}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json()
        console.log(data);
        if(data.success){
            return {success: true};
        }else{
            console.log(data.error);
            return {success: false, error: data.error}
        }
      } catch (error) {
        console.log(error);
        return { success: false, error: error.message };
      }
}