import { mockProducts } from '@/app/(shop)/products/[mainCategory]/lib/products';
import { createClient } from '../../utils/supabase/client';
import { Products } from '@/app/(shop)/products/[mainCategory]/lib/products';

type ProductsResponse = {
  products: Products[];
  category: string;
};

type GetProductsParams = {
  page: string;
  pageSize: number;
  category: string;
  sort: string;
  keyword?: string;
};

type RecommendProductsParams = {
  category: string;
  keyword?: string;
};

const productSelect = `
  *,
  product_categories!inner(
    categories!inner(
      id,
      name
    )
  )
`;

const USE_MOCK = true;

// 🔥 할인 가격 계산 함수
const getDiscountPrice = (price: number, discount: number) => {
  return price * (1 - discount / 100);
};

// =============================
// 상품 조회
// =============================
export const getProducts = async (params: GetProductsParams): Promise<ProductsResponse> => {
  if (USE_MOCK) {
    return getMockProducts(params);
  }

  const supabase = createClient();

  let query = supabase.from('products').select(productSelect).eq('product_categories.categories.name', params.category);

  if (params.keyword) {
    query = query.ilike('name', `%${params.keyword}%`);
  }

  if (params.sort === 'latest') {
    query = query.order('created_at', { ascending: false });
  }

  const from = (Number(params.page) - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, error } = await query.range(from, to);

  if (error) throw new Error(error.message);

  let products = (data as Products[]) ?? [];

  if (params.sort === 'highPrice' || params.sort === 'lowPrice') {
    products = [...products].sort((a, b) => {
      const aPrice = getDiscountPrice(a.price, a.discount_rate);
      const bPrice = getDiscountPrice(b.price, b.discount_rate);

      return params.sort === 'lowPrice' ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  return {
    products,
    category: params.category,
  };
};

// =============================
// 추천 상품
// =============================
export const getRecommendProducts = async ({ category, keyword }: RecommendProductsParams): Promise<ProductsResponse> => {
  if (USE_MOCK) {
    const mock = getMockProducts({
      page: '1',
      pageSize: 20,
      category,
      keyword,
      sort: 'latest',
    });

    const shuffled = [...mock.products].sort(() => Math.random() - 0.5);

    return {
      products: shuffled.slice(0, 4),
      category,
    };
  }

  const supabase = createClient();

  let query = supabase.from('products').select(productSelect).eq('product_categories.categories.name', category).limit(20);

  if (keyword) {
    query = query.ilike('name', `%${keyword}%`);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const shuffled = [...((data as Products[]) ?? [])].sort(() => Math.random() - 0.5);

  return {
    products: shuffled.slice(0, 4),
    category,
  };
};

const getMockProducts = ({ page, pageSize, category, keyword, sort }: GetProductsParams): ProductsResponse => {
  let result = [...mockProducts] as unknown as Products[];

  if (category) {
    result = result.filter(p => p.category === category);
  }

  if (keyword) {
    result = result.filter(p => p.name.includes(keyword));
  }

  if (sort === 'highPrice' || sort === 'lowPrice') {
    result = [...result].sort((a, b) => {
      const aPrice = getDiscountPrice(a.price, a.discount_rate);
      const bPrice = getDiscountPrice(b.price, b.discount_rate);

      return sort === 'lowPrice' ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  if (sort === 'latest') {
    result = [...result].sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
  }

  const from = (Number(page) - 1) * pageSize;
  const to = from + pageSize;

  return {
    products: result.slice(from, to),
    category,
  };
};
