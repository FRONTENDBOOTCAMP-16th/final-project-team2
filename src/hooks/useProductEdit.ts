import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { productUpdateSchema } from '@/app/mypage/types/productSchema'
import useOptionForm from '@/hooks/useOptionForm'

export const useProductEdit = (product: SellerProduct, onClose: () => void) => {
  const supabase = createClient()

  const [formData, setFormData] = useState({
    status: product.status || '판매중',
    inventory: product.inventory || 0,
    price: product.price || 0,
    discount_rate: product.discount_rate || 0,
    category: '',
  })

  const [isCategoryLoaded, setIsCategoryLoaded] = useState(false)
  const optionForm = useOptionForm(product.options || [])
  const { setOptions } = optionForm.actions
  const [errors, setErrors] = useState<Record<string, string>>({})
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    const initializeData = async () => {
      if (product.id) {
        const { data, error } = await supabase
          .from('product_categories')
          .select('category_id')
          .eq('product_id', product.id)
          .maybeSingle()

        if (error) {
          console.error('카테고리 로드 실패:', error)
        } else if (data) {
          setFormData((prev) => ({ ...prev, category: data.category_id }))
        }
      }

      if (
        product.options &&
        Array.isArray(product.options) &&
        product.options.length > 0
      ) {
        setOptions(product.options)
      }

      isInitialized.current = true
      setIsCategoryLoaded(true)
    }

    initializeData()
  }, [product.id, product.options, supabase, setOptions])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    let nextValue: string | number = value

    if (type === 'number') {
      nextValue = value === '' ? 0 : Number(value)
      if (nextValue < 0) nextValue = 0
      if (name === 'discount_rate' && nextValue > 100) nextValue = 100
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async () => {
    const allData = {
      ...formData,
      options: optionForm.state.options,
    }

    const result = productUpdateSchema.safeParse(allData)

    if (!result.success) {
      const formattedErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        formattedErrors[fieldName] = issue.message
      })
      setErrors(formattedErrors)
      return
    }

    try {
      const { error: productUpdateError } = await supabase
        .from('products')
        .update({
          status: result.data.status,
          inventory: result.data.inventory,
          price: result.data.price,
          discount_rate: result.data.discount_rate,
          options: result.data.options,
        })
        .eq('id', product.id)

      if (productUpdateError) throw productUpdateError

      const { error: categoryUpdateError } = await supabase
        .from('product_categories')
        .upsert(
          {
            product_id: product.id,
            category_id: result.data.category,
          },
          { onConflict: 'product_id' },
        )

      if (categoryUpdateError) throw categoryUpdateError

      alert('상품 정보가 성공적으로 수정되었습니다.')
      onClose()
      window.location.reload()
    } catch (error) {
      console.error('수정 실패:', error)
      alert('저장 중 오류가 발생했습니다.')
    }
  }

  const finalPrice = Math.floor(
    formData.price * (1 - formData.discount_rate / 100),
  )

  return {
    formData,
    isCategoryLoaded,
    errors,
    handleChange,
    handleSubmit,
    finalPrice,
    optionForm,
    clearOptionError: () => setErrors((prev) => ({ ...prev, options: '' })),
  }
}
