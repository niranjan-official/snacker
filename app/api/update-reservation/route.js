import { db } from "@/firebase/config";
import { doc, runTransaction } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const products = await req.json();

  try {
    await runTransaction(db, async (transaction) => {
      const productDocs = await Promise.all(
        products.map((product) => {
          const productRef = doc(db, "products", product.productId);
          return transaction
            .get(productRef)
            .then((productDoc) => ({ productRef, productDoc }));
        }),
      );

      // Update reserved stock and actual stock
      productDocs.forEach(({ productRef, productDoc }) => {
        const product = products.find((p) => p.productId === productRef.id);
        const productData = productDoc.data();
        const newReserved = productData.reserved - product.count;
        const newStock = productData.stock - product.count;

        transaction.update(productRef, {
          reserved: newReserved,
          stock: newStock,
        });
      });
    });

    console.log("Reservation updated successfully");
    return NextResponse.json({
      success: true,
      message: "Reservation updated successfully",
    });
  } catch (e) {
    console.error("Error updating reservation:", e.message);
    return NextResponse.json({ success: false, message: e.message });
  }
}
