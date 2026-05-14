import { OrdersType } from '@/app/lib/orders'
import { createClient } from '@/utils/supabase/client'

export const fetchOrders = async (
  page: number,
  limit: number,
  sort: string = 'all',
  status: string = 'all',
) => {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { items: [], count: 0 }

  let query = supabase
    .from('orders')
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
      { count: 'exact' },
    )
    .eq('user_id', user.id)

  if (sort === 'latest') {
    query = query.order('created_at', { ascending: false })
  } else if (sort === 'high-price') {
    query = query.order('final_price', { ascending: false })
  } else if (sort === 'low-price') {
    query = query.order('final_price', { ascending: true })
  }
  if (status !== 'all') {
    query = query.eq('order_status', status)
  }
  const { data, error, count } = await query
    .range(from, to)
    .returns<OrdersType[]>()

  if (error) throw error
  console.log(data)

  return {
    items: data ?? [],
    count: count ?? 0,
  }
}
