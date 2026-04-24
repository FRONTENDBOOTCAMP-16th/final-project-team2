'use client'

import { useState } from "react";
import ProductsCard from "./ProductsCard";
import ProductsCardList from "./ProductsCardList";
import products from '@/data/dummyproducts.json';

const MD_PICK_PRODUCTS = 4


export default function ProductMDList() {
  const [maxProducts, setMaxProducts] = useState(MD_PICK_PRODUCTS)
  const [buttonDisabled, setDuttonDisabled] = useState(true)

  const handleMoreProduct = () => {
    setMaxProducts((prev) => prev + 4)
    setDuttonDisabled(false)
  }
  
  return (
    <section className="flex flex-col m-auto w-full ">
      <ProductsCardList>
        <ProductsCard maxProducts={maxProducts} products={products} />
      </ProductsCardList>

      {buttonDisabled && (
        <button
          type="button"
          className="px-40 py-4 mbs-18 m-auto bg-gray-300 font-bold cursor-pointer"
          onClick={handleMoreProduct}
        >
          추천상품 더보기
        </button>
      )}
    </section>
  )
}