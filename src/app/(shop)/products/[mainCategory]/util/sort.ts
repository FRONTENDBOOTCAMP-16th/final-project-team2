type SortType = 'latest' | 'highPrice' | 'lowPrice' | 'popular';

interface Product {
  price: number;
  discount: number;
  name: string;
  image: string;
  category: string;
  createdAt: string;
  popularity: number;
  id: number;
}

const getDiscountPrice = (price: number, discount: number) => {
  return price * (1 - discount / 100);
};

export const sortProducts = (products: Product[], sort?: string) => {
  const type = (sort as SortType) || 'latest';

  const sortMap: Record<SortType, (a: Product, b: Product) => number> = {
    latest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() || b.id - a.id, // 안정 정렬

    highPrice: (a, b) => getDiscountPrice(b.price, b.discount) - getDiscountPrice(a.price, a.discount),

    lowPrice: (a, b) => getDiscountPrice(a.price, a.discount) - getDiscountPrice(b.price, b.discount),

    popular: (a, b) => b.popularity - a.popularity,
  };

  return [...products].sort(sortMap[type]);
};
