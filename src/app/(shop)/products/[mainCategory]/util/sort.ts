type SortType = 'latest' | 'highPrice' | 'lowPrice';

type SortParams = {
  type?: SortType;
};

const sortMap = {
  latest: { field: 'created_at', order: 'desc' },
  highPrice: { field: 'discount_price', order: 'desc' },
  lowPrice: { field: 'discount_price', order: 'asc' },
} as const;

export const sortProducts = ({ type = 'latest' }: SortParams) => {
  return sortMap[type] ?? sortMap['latest'];
};
