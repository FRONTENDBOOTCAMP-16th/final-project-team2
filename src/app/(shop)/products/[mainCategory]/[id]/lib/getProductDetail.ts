import { mockProducts } from '@/app/(shop)/products/[mainCategory]/lib/products';

type GetProductDetailParams = {
  productId: string;
};

export const getProductDetail = async ({ productId }: GetProductDetailParams) => {
  const product = mockProducts.find(product => product.id === productId);

  if (!product) {
    throw new Error('상품을 찾을 수 없습니다.');
  }

  return product;
};
