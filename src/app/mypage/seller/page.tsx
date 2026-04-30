import dummySellerProducts from "@/data/dummySellerProducts.json";
import SellerProductsList from "./products/components/SellerProductItemList";
import { SellerProduct } from "../types/sellerOrderItems";

const HASPRODUCTS = dummySellerProducts.length > 0;
const MAX_CONTENT = 5;
const products = dummySellerProducts as SellerProduct[];

export default function SellerPage() {
  return (
    <section className="flex flex-col gap-4 p-6 w-full bg-white">
      <h1 className="sr-only">나의 상품</h1>
      {HASPRODUCTS ? (
        <SellerProductsList products={products.slice(0, MAX_CONTENT)} />
      ) : (
        <div className="text-red-500 text-center pt-3">
          <p>등록된 상품이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
