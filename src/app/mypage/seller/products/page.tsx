import { SellerProduct } from "../../types/sellerOrderItems";
import SellerProductItemHeader from "./components/SellerProductItemHeader";
import SellerProductsList from "./components/SellerProductItemList";
import dummySellerProducts from "@/data/dummySellerProducts.json";

export default function SellerProductListPage() {
  const products = dummySellerProducts as SellerProduct[];
  return (
    <section className="flex flex-col px-6 pt-6 pb-11.25 w-full bg-whitemb-11.25">
      <h2 className="sr-only">상품 관리 페이지</h2>
      <SellerProductItemHeader />
      <SellerProductsList products={products} />
    </section>
  );
}
