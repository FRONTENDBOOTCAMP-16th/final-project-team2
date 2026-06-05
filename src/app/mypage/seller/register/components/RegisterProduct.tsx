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
import { useActionState, useState, useTransition } from 'react'
import validateProductForm, { ProductForm } from '../lib/validateProductForm'
import useOptionForm from '@/hooks/useOptionForm'
import CategorySelector from './CategorySelector'
import useRegisterImg from '../hooks/useRegisterImg'
import { createClient } from '@/utils/supabase/client'
import CancelButton from './CancelButton'

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
const INITIAL_FORM = {
  productName: '',
  productPrice: '',
  productDescription: '',
  productInventory: '',
  productDiscount: '',
  productCategoryId: '',
}

export default function RegisterProductForm() {
  // 서버 액션
  const [formState, formAction] = useActionState<FormState, FormData>(
    registerProductActionWithState,
    null,
  )
  const [isPending, startTransition] = useTransition()

  const [form, setForm] = useState<Partial<ProductForm>>(INITIAL_FORM)
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

  // 입력 폼 안에 작성한 부분이 있는지 검사
  const isInputted =
    Object.values(form).some((value) => value !== '') ||
    imgForm.preview !== null ||
    optionForm.state.options.length > 0

  // 카테고리 리셋 상태 관리
  const [categoryKey, setCategoryKey] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    if (Object.keys(newErrors).length > 0) return

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    // 클라이언트에서 이미지 업로드
    if (imgForm.imgFile) {
      const supabase = createClient()
      const ext = imgForm.imgFile.name.split('.').pop()
      const fileName = `${Date.now()}.${ext}`

      const { error } = await supabase.storage
        .from('public-assets')
        .upload(`products/${fileName}`, imgForm.imgFile)

      if (error) {
        setClientErrors((prev) => ({
          ...prev,
          productImage: '이미지 업로드에 실패했습니다.',
        }))
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from('public-assets')
        .getPublicUrl(`products/${fileName}`)

      formData.delete('productImage')
      formData.set('thumbnailUrl', publicUrl)
    }

    startTransition(() => {
      formAction(formData)
    })
  }

  const getInputProps = (name: keyof ProductForm) => ({
    value: form[name] ?? '',
    onChange: (value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }))
    },
    onBlur: () => {
      const value = form[name]
      if (typeof value !== 'string') return
      const error = validateProductForm(name, value)
      setClientErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    },
    error:
      clientErrors[name as keyof ProductErrors] ||
      serverErrors?.[name as keyof ProductErrors],
  })

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">상품 등록 페이지</h2>
        <div className="flex flex-row gap-3">
          <CancelButton
            isInputted={isInputted}
            onConfirm={() => {
              setForm(INITIAL_FORM)
              imgForm.resetImg()
              optionForm.actions.resetOptions()
              setClientErrors({})
              setCategoryKey((prev) => prev + 1)
            }}
          />
          <SubmitButton isPending={isPending} />
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-6">
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
        <ProductName {...getInputProps('productName')} />
        <ProductPrice {...getInputProps('productPrice')} />
        <ProductDescription {...getInputProps('productDescription')} />
        <ProductInventory {...getInputProps('productInventory')} />
        <ProductDiscount {...getInputProps('productDiscount')} />
        <CategorySelector
          key={`category-${categoryKey}`}
          value={form.productCategoryId}
          error={
            clientErrors.productCategoryId || serverErrors?.productCategoryId
          }
          onChange={(value) => {
            setForm((prev) => ({ ...prev, productCategoryId: value }))
            setClientErrors((prev) => ({ ...prev, productCategoryId: '' }))
          }}
        />
        <OptionInput optionForm={optionForm} />
      </div>
    </form>
  )
}
