import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";
import SellerProductItemCard from "./SellerProductItemCard";

type Props = {
  products: SellerProduct[];
};

export default function SellerProductsList({ products }: Props) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <SellerProductItemCard product={product} />
        </li>
      ))}
    </ul>
  );
}
