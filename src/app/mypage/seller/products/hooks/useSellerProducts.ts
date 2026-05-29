import { useState, useEffect, useCallback } from 'react'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { createClient } from '@/utils/supabase/client'

export const useSellerProducts = (storeId: string | undefined) => {
  const [products, setProducts] = useState<SellerProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = useCallback(async (targetId: string) => {
    try {
      setIsLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          id, name, store_id, content, price, discount_rate, inventory, status, thumbnail_image,options,
          product_categories (categories (id, name))
        `,
        )
        .eq('store_id', targetId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts((data as unknown as SellerProduct[]) ?? [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (productId: string) => {
    try {
      const supabase = createClient()

      // product_categories 먼저 삭제 (FK 제약 때문에 순서 중요!)
      await supabase
        .from('product_categories')
        .delete()
        .eq('product_id', productId)

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      // 삭제 후 목록에서 바로 제거 (refetch 없이 즉시 반영)
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    } catch (err) {
      console.error('Error deleting product:', err)
    }
  }, [])

  useEffect(() => {
    if (!storeId) {
      const timer = setTimeout(() => setIsLoading(false), 0)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      fetchProducts(storeId)
    }, 0)

    return () => clearTimeout(timer)
  }, [storeId, fetchProducts])

  return {
    products,
    isLoading,
    refetch: () => storeId && fetchProducts(storeId),
    deleteProduct,
  }
}
