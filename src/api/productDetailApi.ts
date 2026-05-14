import { Products } from '@/app/lib/products.types'
import { Store } from '@/app/lib/stores.types'
import { createStaticClient } from '@/utils/supabase/static'
import { cacheLife, cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'

interface ProductProps {
  id: string
  mainCategory: string
}

export const getProductDetail = async ({
  id,
  mainCategory,
}: ProductProps): Promise<Products> => {
  'use cache'

  cacheLife('hours')

  cacheTag('products')
  cacheTag(`product-${id}`)
  cacheTag(`products-${mainCategory}`)

  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    notFound()
  }

  return data as Products
}

interface StoreProps {
  id: string
}

export const getStoreDetailInfo = async ({
  id,
}: StoreProps): Promise<Store> => {
  'use cache'

  cacheLife('days')

  cacheTag('stores')
  cacheTag(`store-${id}`)

  const supabase = createStaticClient()

  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    notFound()
  }

  return data as Store
}
