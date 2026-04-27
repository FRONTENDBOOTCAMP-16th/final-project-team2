import dummySellerProducts from "@/data/dummySellerProducts.json";
import SellerProductItemCard from "./SellerProductItemCard";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";

export default function SellerProductsList() {
  const products = dummySellerProducts as SellerProduct[]

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <SellerProductItemCard product={product} />
        </li>
      ))}
    </ul>
  )
}