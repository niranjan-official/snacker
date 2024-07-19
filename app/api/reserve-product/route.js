import { db } from "@/firebase/config";
import { doc, runTransaction } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const products = await req.json();
  console.log(products);
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

      // Check availability for all products
      for (let { productRef, productDoc } of productDocs) {
        const product = products.find((p) => p.productId === productRef.id);

        if (!productDoc.exists()) {
          throw new Error(`Product with ID ${product.productId} does not exist!`);
        }

        const productData = productDoc.data();
        const availableStock = productData.stock - productData.reserved;

        if (availableStock < product.count) {
          throw new Error(
            `Product with ID ${product.productId} is unavailable or already reserved`,
          );
        }
      }

      // If all products have sufficient stock, update their reserved counts
      productDocs.forEach(({ productRef, productDoc }) => {
        const product = products.find((p) => p.productId === productRef.id);
        const newReserved = productDoc.data().reserved + product.count;
        transaction.update(productRef, { reserved: newReserved });
      });
    });

    console.log("All products reserved successfully");
    return NextResponse.json({ message: "Reservation successful" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e.message });
  }
}
