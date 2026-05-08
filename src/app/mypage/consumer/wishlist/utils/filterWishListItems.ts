import { ProductLikeWithProduct } from "@/app/lib/productLike";

export const filterWishListItems = (
  items: ProductLikeWithProduct[],
  category: string,
) => {
  return items.filter((item) => {
    if (category === "all") return true;

    return item.products.product_categories.some(
      (pc) => pc.categories.name === category,
    );
  });
};
