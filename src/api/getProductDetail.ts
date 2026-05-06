import { Products, mockProducts } from '@/app/(shop)/products/[mainCategory]/lib/products';
import { createClient } from '../../utils/supabase/server';

const USE_MOCK = true;

export const getProductDetail = async (id: string): Promise<Products> => {
  if (USE_MOCK) {
    const product = mockProducts.find(product => product.id === id);

    if (!product) {
      throw new Error('상품을 찾을 수 없습니다.');
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    return product;
  }

  const supabase = await createClient();

  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};