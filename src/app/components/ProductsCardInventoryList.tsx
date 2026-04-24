import products from '@/data/dummyproducts.json';

import ProductsCard from "./ProductsCard";

export default function ProductsCardInventoryList() {
  console.log('??')
  return (
    <ul className="flex [&>li]:border [&>li]:p-4 gap-4">
      <ProductsCard maxProducts={4} products={products} hasLike/>
    </ul>
  )
}