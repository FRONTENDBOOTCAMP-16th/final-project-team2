import { createClient } from "../../../../utils/supabase/client";

export const fetchDelivery = async (page: number, limit: number) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  {
    const supabase = createClient();
    // 유저 찾기
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { items: [], count: 0 };

    // 상점 찾기
    const { data: store } = await supabase
      .from("stores")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    if (!store) return { items: [], count: 0 };

    // 내 스토어의 상품 id 목록 먼저 가져오기
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .eq("store_id", store.id);

    if (!products) return { items: [], count: 0 };

    const productIds = products.map((p) => p.id);

    // 그 상품 id로 order_items 필터링
    const { data, count } = await supabase
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
        { count: "exact" }, // 나눠서 가져오는 데이터의 총 개수 (표시용)
      )
      .in("product_id", productIds)
      .range(from, to); // 몇 개의 데이터를 나눠서 보여줄지

    if (!data) return [];

    // user_id 목록 추출
    const userIds = data.map((item) => item.orders.user_id);

    // 이메일 가져오기
    const { data: users } = await supabase
      .from("users")
      .select("id, email")
      .in("id", userIds);

    return {
      items: data.map((item) => ({
        ...item,
        email: users?.find((u) => u.id === item.orders.user_id)?.email ?? "",
      })),
      count: count ?? 0,
    };
  }
};
