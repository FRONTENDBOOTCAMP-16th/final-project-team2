import dummySellerProducts from "@/data/dummySellerProducts.json";
import SellerProductItemHeader from "./products/components/SellerProductItemHeader";
import SellerProductsList from "./products/components/SellerProductItemList";


const HASPRODUCTS = dummySellerProducts.length

export default function SellerPage() {


  return (
    <div className="flex-col gap-3">
      <h1 className="sr-only">나의 상품</h1>
     <section className="flex flex-col gap-4 p-6 max-w-4xl m-auto mt-10 bg-white">
        <h2 className="sr-only">상품 관리 섹션</h2>
        <SellerProductItemHeader/>
        {HASPRODUCTS > 0 ? (
          <SellerProductsList/>
          
        ) : (
        <div className="text-red-500 text-center pt-3">
            <p>주문한 상품이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
