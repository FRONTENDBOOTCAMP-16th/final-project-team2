import { createClient } from "../../../../utils/supabase/client";

export const fetchDelivery = async () => {
  {
    const supabase = createClient();
    // 유저 찾기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    // 상점 찾기
    const { data: store } = await supabase
      .from("stores")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    if (!store) return;

    // 내 스토어의 상품 id 목록 먼저 가져오기
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .eq("store_id", store.id);

    if (!products) return [];

    const productIds = products.map((p) => p.id);

    // 그 상품 id로 order_items 필터링
    const { data } = await supabase
      .from("order_items")
      .select(
        `
    *,
    orders (*),
    products (
      name,
      thumbnail_image,
      discount_rate
    )
  `,
      )
      .in("product_id", productIds);

    if (!data) return [];

    // user_id 목록 추출
    const userIds = data.map((item) => item.orders.user_id);

    // 이메일 가져오기
    const { data: users } = await supabase
      .from("users")
      .select("id, email")
      .in("id", userIds);

    return data.map((item) => ({
      ...item,
      email: users?.find((u) => u.id === item.orders.user_id)?.email ?? "",
    }));
  }
};
