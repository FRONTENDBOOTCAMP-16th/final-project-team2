import { Products } from "@/app/lib/products"
import { createClient } from "../../utils/supabase/server"

interface GetProductsAllProps {
  sort?: string
  pageSize: number
  page?: number
}

export const getProductsAll = async ({ sort, pageSize, page = 1 }: GetProductsAllProps) => {
  const supabase = await createClient()

  // 
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });
  
  switch (sort) {
    case 'average_grade':
      query = query.order('average_grade', { ascending: false });
      break;

    // 조건 추가해야함
    // case 'lowPrice':
    //   query = query.order('price', { ascending: true });
    //   break;

    // case 'highPrice':
    //   query = query.order('price', { ascending: false });
    //   break;
  }

  //
  const from = ((page || 1) -1) * pageSize
  const to = from + pageSize - 1

  // 
  const { data, error, count } = await query.range(from, to)

  let products = (data as Products[]) ?? [];

  // ??
  if (error) throw error

  return {
    products,
    totalCount: count ?? 0
  }
}