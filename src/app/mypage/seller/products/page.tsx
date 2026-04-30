import { SellerProduct } from "../../types/sellerOrderItems";
import SellerProductItemHeader from "./components/SellerProductItemHeader";
import SellerProductsList from "./components/SellerProductItemList";
import dummySellerProducts from "@/data/dummySellerProducts.json";

export default function SellerProductListPage() {
  const products = dummySellerProducts as SellerProduct[];
  return (
    <section className="flex flex-col gap-4 pt-12 px-15 pb-15  w-full bg-white">
      <h2 className="sr-only">상품 관리 페이지</h2>
      <SellerProductItemHeader />
      <SellerProductsList products={products} />
    </section>
  );
}
