import { OrdersType } from "@/app/lib/Orders";
import { CategoryId } from "./orderTabGroups";

export const sortOrders = (items: OrdersType[], sort: CategoryId) => {
  switch (sort) {
    case "latest":
      return items.toSorted(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

    case "high-price":
      return items.toSorted((a, b) => b.final_price - a.final_price);

    case "low-price":
      return items.toSorted((a, b) => a.final_price - b.final_price);

    default:
      return items;
  }
};
