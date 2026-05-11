import { OrdersType } from "@/app/lib/Orders";
import { createClient } from "@/utils/supabase/client";

export const fetchOrders = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
    id,
    order_status,
    final_price,
    created_at,

    order_items (
      id,
      product_id,
      quantity,
      unit_price,
      item_status,

      products (
        id,
        name,
        thumbnail_image,

        product_categories (
          categories (
            id,
            name
          )
        )
      )
    )
  `,
    )
    .eq("user_id", user.id)
    .returns<OrdersType[]>();

  if (error) throw error;
  return data ?? [];
};
