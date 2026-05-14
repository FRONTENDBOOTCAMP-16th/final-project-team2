'use client'
import OptionInput from './OptionInput'
import ProductName from './ProductName'
import ProductImg from './ProductImg'
import ProductPrice from './ProductPrice'
import ProductDescription from './ProductDescription'
import ProductInventory from './ProductInventory'
import ProductDiscount from './ProductDiscount'
import SubmitButton from './SubmitButton'
import {
  FormState,
  registerProductActionWithState,
} from '../actions/registerProduct'
import { useActionState, useState } from 'react'
import validateProductForm, { ProductForm } from '../lib/validateProductForm'
import useOptionForm from '@/hooks/useOptionForm'
import CategorySelector from './CategorySelector'
import useRegisterImg from '../hooks/useRegisterImg'

type ProductErrors = {
  productImage?: string
  productName?: string
  productPrice?: string
  productDescription?: string
  productInventory?: string
  productDiscount?: string
  productOptions?: string
  productCategoryId?: string
}

export default function RegisterProductForm() {
  // 서버 액션
  const [formState, formAction] = useActionState<FormState, FormData>(
    registerProductActionWithState,
    null,
  )

  const [form, setForm] = useState<Partial<ProductForm>>({
    productName: '',
    productPrice: '',
    productDescription: '',
    productInventory: '',
    productDiscount: '',
    productCategoryId: '',
  })
  const serverErrors = formState?.errors
  const [clientErrors, setClientErrors] = useState<ProductErrors>({})

  //옵션 상태
  const optionForm = useOptionForm()

  // 이미지 업로드 상태
  const imgForm = useRegisterImg()

  const validateAll = () => {
    const newErrors: ProductErrors = {}

    Object.entries(form).forEach(([key, value]) => {
      const error = validateProductForm(key as keyof ProductForm, value)

      if (error) {
        newErrors[key as keyof ProductErrors] = error
      }
    })

    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    const newErrors = validateAll()

    if (!imgForm.preview) {
      newErrors.productImage = '상품 이미지를 업로드해주세요.'
    }

    setClientErrors(newErrors)

    if (optionForm.state.options.length === 0) {
      optionForm.actions.setError('옵션을 추가하세요.')

      e.preventDefault()
      return
    }

    // 하나라도 폼 양식이 작성되어있지 않은 경우에, 제출을 할 수 없음
    if (Object.keys(newErrors).length > 0) {
      e.preventDefault()
    }
  }

  const handleInputChange = <T extends keyof ProductForm>(
    name: T,
    value: ProductForm[T],
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = <T extends keyof ProductForm>(name: T) => {
    // form에서 해당 input의 현재 값을 가져오기
    const value = form[name]
    if (typeof value !== 'string') return
    const error = validateProductForm(name, value)

    // 해당 인푹의 에러만 업데이트 해서 보여줌
    setClientErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  // 클라이언트 또는 서버측에 둘 중 하나 에러 발생할 수 있으니 체크
  // -> {clientErrors.name || serverErrors?.name}
  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 px-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">상품 등록 페이지</h2>
        <SubmitButton />
      </div>

      <div className="flex flex-col gap-y-6">
        <ProductImg
          key={imgForm.imgKey}
          fileName={imgForm.fileName}
          preview={imgForm.preview}
          onChangeImg={(e) => {
            imgForm.handleChangeImg(e)
            setClientErrors((prev) => ({ ...prev, productImage: undefined }))
          }}
          error={clientErrors.productImage || serverErrors?.productImage}
        />
        <ProductName
          value={form.productName ?? ''}
          error={clientErrors.productName || serverErrors?.productName}
          onChange={(value) => handleInputChange('productName', value)}
          onBlur={() => handleBlur('productName')}
        />
        <ProductPrice
          value={form.productPrice ?? ''}
          error={clientErrors.productPrice || serverErrors?.productPrice}
          onChange={(value) => handleInputChange('productPrice', value)}
          onBlur={() => handleBlur('productPrice')}
        />
        <ProductDescription
          value={form.productDescription ?? ''}
          error={
            clientErrors.productDescription || serverErrors?.productDescription
          }
          onChange={(value) => handleInputChange('productDescription', value)}
          onBlur={() => handleBlur('productDescription')}
        />
        <ProductInventory
          value={form.productInventory ?? ''}
          error={
            clientErrors.productInventory || serverErrors?.productInventory
          }
          onChange={(value) => handleInputChange('productInventory', value)}
          onBlur={() => handleBlur('productInventory')}
        />
        <ProductDiscount
          value={form.productDiscount ?? ''}
          error={clientErrors.productDiscount || serverErrors?.productDiscount}
          onChange={(value) => handleInputChange('productDiscount', value)}
          onBlur={() => handleBlur('productDiscount')}
        />
        <CategorySelector
          error={
            clientErrors.productCategoryId || serverErrors?.productCategoryId
          }
          onChange={(value) => {
            handleInputChange('productCategoryId', value)
            setClientErrors((prev) => ({ ...prev, productCategoryId: '' }))
          }}
        />
        <OptionInput optionForm={optionForm} />
      </div>
    </form>
  )
}
