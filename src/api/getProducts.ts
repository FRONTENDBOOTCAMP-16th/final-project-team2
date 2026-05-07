import { Products } from '@/app/lib/products';
import { createClient } from '../../utils/supabase/server';

type ProductsResponse = {
  products: Products[];
};

type GetProductsParams = {
  category: string;
  sort: string;
  page: string;
  pageSize: number;
};

const getDiscountPrice = (price: number, discount: number) => {
  return price * (1 - discount / 100);
};

export const getProductsCategory = async (params: GetProductsParams): Promise<ProductsResponse> => {
  const supabase = await createClient();

  const { data: currentCategory, error: categoryError } = await supabase
    .from('categories')
    .select('id, name, parent_id')
    .eq('name', params.category)
    .maybeSingle();

  if (categoryError || !currentCategory) {
    return {
      products: [],
    };
  }

  let categoryIds: string[] = [];

  if (!currentCategory.parent_id) {
    const { data: childCategories, error: childError } = await supabase.from('categories').select('id').eq('parent_id', currentCategory.id);

    if (childError) {
      throw new Error(childError.message);
    }

    categoryIds = [currentCategory.id, ...(childCategories?.map(item => item.id) ?? [])];
  } else {
    categoryIds = [currentCategory.id];
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
    };
  }

  let query = supabase.from('products').select('*').in('id', productIds);

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

  const from = (Number(params.page) - 1) * params.pageSize;
  const to = from + params.pageSize - 1;

  const { data, error } = await query.range(from, to);

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
  };
};
