import { db } from "@/firebase/config";
import { doc, runTransaction } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const { products, userId, amount } = data;

  try {
    await runTransaction(db, async (transaction) => {
      // Retrieve user document
      const userRef = doc(db, "users", userId);
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists()) {
        throw new Error("User does not exist");
      }
      console.log(userDoc.data());

      const userCredits = userDoc.data().credit;

      if (userCredits < amount) {
        throw new Error("Insufficient credits");
      }

      // Retrieve product documents in parallel
      const productPromises = products.map(async (product) => {
        const productRef = doc(db, "products", product.productId);
        const productDoc = await transaction.get(productRef);
        return { productRef, productDoc };
      });

      const productDocs = await Promise.all(productPromises);

      // Update actual stock
      productDocs.forEach(({ productRef, productDoc }) => {
        const product = products.find((p) => p.productId === productRef.id);
        const productData = productDoc.data();
        const newStock = productData.stock - product.count;

        if (newStock < 0) {
          throw new Error(`Insufficient stock for product ${productRef.id}`);
        }

        transaction.update(productRef, {
          stock: newStock,
        });
      });

      // Deduct credits from user
      const newCredits = userCredits - amount;
      transaction.update(userRef, {
        credit: newCredits,
      });
    });

    console.log("Reservation and credits updated successfully");
    return NextResponse.json({
      success: true,
      message: "Updation and credits updated successfully",
    });
  } catch (e) {
    console.error("Error updating reservation:", e.message);
    return NextResponse.json({ success: false, error: e.message });
  }
}