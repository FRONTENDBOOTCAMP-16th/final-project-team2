import { dummyOrderItems } from "@/data/dummyOrder";
import DeliveryProductCard from "./DeliveryProductCard";

const myProductIds = [
  "prod-1",
  "prod-4",
  "prod-2",
  "prod-13",
  "prod-5",
  "prod-8",
];
const myOrders = dummyOrderItems.filter((item) =>
  myProductIds.includes(item.productId),
);
export default function DeliveryProductList() {
  return (
    <ul>
      {myOrders.map((item) => (
        <li key={item.id}>
          <DeliveryProductCard order={item} />
        </li>
      ))}
    </ul>
  );
}
