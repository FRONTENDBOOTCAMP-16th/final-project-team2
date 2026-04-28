import { OrderItem } from "@/app/mypage/types/orderItem";
import WishListItemCard from "./WishListItemsCard";

export default function WishListItemsList({ items }: { items: OrderItem[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6  gap-y-15 ">
      {items.map((item) => (
        <li key={item.id}>
          <WishListItemCard order={item} />
        </li>
      ))}
    </ul>
  );
}
