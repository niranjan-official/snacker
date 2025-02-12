import Decor from "@/components/home/Decor";
import HomeNotch from "@/components/home/HomeNotch";
import ProductSection from "@/components/home/ProductSection";
import CreditWallet from "@/components/shared/CreditWallet";
import { getProductList } from "@/helpers/GetProductsList";
import { currentUser } from "@clerk/nextjs/server";

export const revalidate = 0;

export default async function Home() {
  const { username, id } = await currentUser();
  const products = await getProductList();

  return (
    <div className="min-h-screen w-full p-6 pb-20 md:px-16 relative">
      <HomeNotch username={username} id={id} />
      <ProductSection products={products} />
      <CreditWallet />
      {/* <Decor/> */}
    </div>
  );
}
