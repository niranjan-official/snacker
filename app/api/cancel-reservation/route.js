import { db } from "@/firebase/config";
import { doc, runTransaction } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    
  const products = await req.json();
  console.log(products);

  try {
    await runTransaction(db, async (transaction) => {
      const productDocs = await Promise.all(
        products.map((product) => {
          const productRef = doc(db, "products", product.productId);
          return transaction.get(productRef).then((productDoc) => ({ productRef, productDoc }));
        })
      );

      // Check if all products exist and have sufficient reserved stock
      for (let { productRef, productDoc } of productDocs) {
        const product = products.find((p) => p.productId === productRef.id);

        if (!productDoc.exists()) {
          throw new Error(
            `Product with ID ${product.productId} does not exist!`
          );
        }

        const productData = productDoc.data();
        const reservedStock = productData.reserved;

        if (reservedStock < product.count) {
          throw new Error(
            `Product with ID ${product.productId} does not have enough reserved stock to cancel`
          );
        }
      }

      // Update reserved counts
      productDocs.forEach(({ productRef, productDoc }) => {
        const product = products.find((p) => p.productId === productRef.id);
        const newReserved = productDoc.data().reserved - product.count;
        transaction.update(productRef, { reserved: newReserved });
      });
    });

    console.log("All product reservations canceled successfully");
    return NextResponse.json({
      success: true,
      message: "Reservation canceled successfully",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, message: e.message });
  }
}
