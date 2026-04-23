import { PropsWithChildren } from 'react';

const ProductsCardList = ({ children }: PropsWithChildren) => {
  return <ul className="flex flex-wrap gap-6">{children}</ul>;
};

export default ProductsCardList;
