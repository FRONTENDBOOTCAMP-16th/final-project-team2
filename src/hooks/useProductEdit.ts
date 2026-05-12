import { useState } from 'react'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { productUpdateSchema } from '@/app/mypage/types/productSchema'

export const useProductEdit = (product: SellerProduct, onClose: () => void) => {
  const [formData, setFormData] = useState({
    state: product.state,
    inventory: product.inventory,
    price: product.price,
    discount_rate: product.discount_rate,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleSubmit = () => {
    const result = productUpdateSchema.safeParse(formData)

    if (!result.success) {
      const formattedErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        if (fieldName !== 'discount_rate') {
          formattedErrors[fieldName] = issue.message
        }
      })
      setErrors(formattedErrors)
      return
    }

    // TODO: Supabase 연동
    console.log('검증된 데이터:', result.data)
    onClose()
  }

  const finalPrice = Math.floor(
    formData.price * (1 - formData.discount_rate / 100),
  )

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    finalPrice,
  }
}
