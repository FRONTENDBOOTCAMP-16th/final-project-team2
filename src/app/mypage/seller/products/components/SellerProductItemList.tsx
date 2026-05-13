'use client'

import { useState } from 'react'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import SellerProductItemCard from './SellerProductItemCard'
import Pagination from '../../delivery/components/Pagination'
import { usePagination } from '@/hooks/usePagination'
import ProductEditModal from './ProductEditModal'
import { useUser } from '@/app/mypage/context/UserContext'
import { SellerProductItemSkeleton } from './SellerProductItemSkeleton'

type Props = {
  products: SellerProduct[]
}

export default function SellerProductItemList({ products }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<SellerProduct | null>(
    null,
  )

  const { isLoading } = useUser()

  const itemsPerPage = 5

  const { currentItems, totalPages } = usePagination(
    products,
    itemsPerPage,
    currentPage,
  )

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <ul>
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i}>
              <SellerProductItemSkeleton />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            <SellerProductItemCard
              product={product}
              onEdit={() => setSelectedProduct(product)}
            />
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedProduct && (
        <ProductEditModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
