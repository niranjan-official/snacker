import ItemList from "@/components/home/ItemList";
import { db } from "@/firebase/config";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { HiViewGrid } from "react-icons/hi";

export const revalidate = 0;

const getProductList = async () => {
  
  try {
    let products = [];
    const q = query(collection(db, "products"), where("stock", ">", 0));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      const data = doc.data();
      products.push({ id: doc.id, ...data });
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function Home() {
  const { username } = await currentUser();
  const products = await getProductList();

  return (
    <div className="min-h-screen w-full p-6 pb-20">
      <div className="flex items-center justify-between">
        <HiViewGrid
          size={30}
          className="rounded-md bg-dark-100 p-1 text-primary"
        />
        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <p className="mt-4">
        Hi{" "}
        <span className="capitalize">
          {username}
          <span className="text-xl">👋</span>
        </span>
      </p>
      <ItemList products={products} />
    </div>
  );
}
