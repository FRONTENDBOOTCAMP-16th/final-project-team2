import { Products } from '@/app/lib/products';
import { createClient } from '../../utils/supabase/server';
import { notFound } from 'next/navigation';

type ProductsResponse = {
  products: Products[];
  totalCount: number;
};

type GetProductsParams = {
  mainCategory: string;
  category?: string;
  sort: string;
  page?: number;
  pageSize: number;
};

const MAIN_CATEGORY_MAP: Record<string, string> = {
  writing: '필기구',
  paper: '노트/다이어리',
  deco: '데코/다꾸',
  office: '사무/데스크용품',
};

const SUB_CATEGORY_MAP: Record<string, string> = {
  ballpen: '볼펜',
  fountainpen: '만년필',
  sharp: '샤프',
  diary: '다이어리',
  planner: '플래너',
  'desk-organizer': '데스크 수납/정리',
  'file-storage': '파일/서류보관',
  'masking-tape': '마스킹테이프',
  sticker: '스티커',
};

const getDiscountPrice = (price: number, discount: number) => {
  return price * (1 - discount / 100);
};

export const getProductsCategory = async (params: GetProductsParams): Promise<ProductsResponse> => {
  const supabase = await createClient();

  const mainCategoryName = MAIN_CATEGORY_MAP[params.mainCategory] ? MAIN_CATEGORY_MAP[params.mainCategory] : notFound();
  const subCategoryName = params.category ? SUB_CATEGORY_MAP[params.category] : '';
  const { data: mainCategory, error: mainCategoryError } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .eq('name', mainCategoryName)
    .maybeSingle();

  if (mainCategoryError || !mainCategory) {
    return {
      products: [],
      totalCount: 0,
    };
  }

  let categoryIds: string[] = [];

  if (subCategoryName) {
    const { data: subCategory, error: subCategoryError } = await supabase
      .from('categories')
      .select('id, name, parent_id')
      .eq('name', subCategoryName)
      .eq('parent_id', mainCategory.id)
      .maybeSingle();

    if (subCategoryError || !subCategory) {
      return {
        products: [],
        totalCount: 0,
      };
    }

    categoryIds = [subCategory.id];
  } else {
    const { data: childCategories, error: childError } = await supabase.from('categories').select('id').eq('parent_id', mainCategory.id);

    if (childError) {
      throw new Error(childError.message);
    }

    categoryIds = [mainCategory.id, ...(childCategories?.map(item => item.id) ?? [])];
  }

  const { data: productCategoryData, error: productCategoryError } = await supabase
    .from('product_categories')
    .select('product_id')
    .in('category_id', categoryIds);

  if (productCategoryError) {
    throw new Error(productCategoryError.message);
  }

  const productIds = productCategoryData?.map(item => item.product_id) ?? [];

  if (productIds.length === 0) {
    return {
      products: [],
      totalCount: 0,
    };
  }

  let query = supabase.from('products').select('*', { count: 'exact' }).in('id', productIds);

  switch (params.sort) {
    case 'latest':
      query = query.order('created_at', { ascending: false });
      break;

    case 'lowPrice':
      query = query.order('price', { ascending: true });
      break;

    case 'highPrice':
      query = query.order('price', { ascending: false });
      break;
  }

  const currentPage = Number(params.page) || 1;
  const from = (currentPage - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  let products = (data as Products[]) ?? [];

  if (params.sort === 'lowPrice' || params.sort === 'highPrice') {
    products = [...products].sort((a, b) => {
      const aPrice = getDiscountPrice(a.price, a.discount_rate);
      const bPrice = getDiscountPrice(b.price, b.discount_rate);

      return params.sort === 'lowPrice' ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  return {
    products,
    totalCount: count ?? 0,
  };
};
