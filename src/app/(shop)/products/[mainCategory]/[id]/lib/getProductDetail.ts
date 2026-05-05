import { mockProducts } from '@/app/(shop)/products/[mainCategory]/lib/products';

type GetProductDetailParams = {
  id: string;
};

export const getProductDetail = async ({ id }: GetProductDetailParams) => {
  const product = mockProducts.find(product => product.id === id);

  if (!product) {
    throw new Error('상품을 찾을 수 없습니다.');
  }

  return product;
};
