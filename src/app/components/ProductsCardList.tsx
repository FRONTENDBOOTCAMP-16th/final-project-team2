import { PropsWithChildren } from 'react';

const ProductsCardList = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 -mx-4 sm:-mx-6 lg:-mx-8">{children}</ul>
    </div>
  );
};

export default ProductsCardList;
