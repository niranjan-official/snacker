import Credit from "@/components/home/Credit";
import ItemList from "@/components/home/ItemList";
import UserProfileButton from "@/components/home/UserProfileButton";
import { db } from "@/firebase/config";
import { currentUser } from "@clerk/nextjs/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { HiViewGrid } from "react-icons/hi";

export const revalidate = 0;

const getProductList = async () => {
  try {
    let products = [];
    const q = query(collection(db, "products"), where("stock", ">", 0));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, ...data });
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCredit = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      return data.credit;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.log(e.message);
  }
  return null;
};

export default async function Home() {
  const { username, id } = await currentUser();
  const [products, credit] = await Promise.all([
    getProductList(),
    getCredit(id),
  ]);

  return (
    <div className="min-h-screen w-full p-6 pb-20">
      <div className="flex items-center justify-between">
        <HiViewGrid
          size={30}
          className="rounded-md bg-dark-100 p-1 text-primary"
        />
        <UserProfileButton />
      </div>
      <div className="flex w-full items-center justify-between mt-4">
        <p>
          Hi{" "}
          <span className="capitalize">
            {username}
            <span className="text-xl">👋</span>
          </span>
        </p>
        <Credit credit={credit} />
      </div>
      <ItemList products={products} />
    </div>
  );
}
