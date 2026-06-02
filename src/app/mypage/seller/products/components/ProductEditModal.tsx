'use client'

import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { ProductFormField } from './ProductFormField'
import { useProductEdit } from '@/hooks/useProductEdit'
import CategorySelector from '../../register/components/CategorySelector'
import OptionInput from '../../register/components/OptionInput'
import ImageUploader from '@/app/mypage/consumer/profile/components/ImageUploader'
import Modal from '@/app/components/Modal'

interface Props {
  product: SellerProduct
  onClose: () => void
}

export default function ProductEditModal({ product, onClose }: Props) {
  const {
    formData,
    isCategoryLoaded,
    errors,
    handleChange,
    handleSubmit,
    finalPrice,
    optionForm,
    clearOptionError,
  } = useProductEdit(product, onClose)

  const inputStyle =
    'w-full border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="상품 정보 수정"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-[#D1D5DC] py-4 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-black py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-gray-800 active:scale-[0.98]"
          >
            정보 수정 완료
          </button>
        </>
      }
    >
      <div className="space-y-10">
        <section>
          <label className="mb-3 block text-sm font-medium">상품 이미지</label>
          <div className="rounded-md border border-[#D1D5DC] bg-[#F9FAFB] p-6">
            <ImageUploader
              key={product.id}
              label=""
              defaultImage={product.thumbnail_image}
              isEditing={true}
            />
          </div>
        </section>

        <section>
          <ProductFormField label="카테고리 설정" error={errors.category}>
            <div className="mt-2">
              {isCategoryLoaded ? (
                <CategorySelector
                  value={formData.category}
                  onChange={(categoryId) => {
                    handleChange({
                      target: { name: 'category', value: categoryId },
                    } as React.ChangeEvent<
                      HTMLSelectElement | HTMLInputElement
                    >)
                  }}
                />
              ) : (
                <div className="h-10 w-48 animate-pulse rounded-md bg-gray-100" />
              )}
            </div>
          </ProductFormField>
        </section>

        <section>
          <ProductFormField label="옵션 설정" error={errors.options}>
            <div onClick={clearOptionError}>
              <OptionInput optionForm={optionForm} />
            </div>
          </ProductFormField>
        </section>

        <section className="grid grid-cols-2 gap-6">
          <ProductFormField label="판매 상태" error={errors.status}>
            <div className="relative mt-2">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`${inputStyle} cursor-pointer appearance-none`}
              >
                <option value="ON_SALE">판매중</option>
                <option value="SOLD_OUT">품절</option>
                <option value="HIDDEN">판매중지</option>
                <option value="PREPARING">준비중</option>
              </select>
              <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </ProductFormField>

          <ProductFormField label="재고 수량" error={errors.inventory}>
            <div className="mt-2">
              <input
                type="number"
                name="inventory"
                value={formData.inventory === 0 ? '' : formData.inventory}
                onChange={handleChange}
                className={inputStyle}
                placeholder="0"
              />
            </div>
          </ProductFormField>

          <ProductFormField label="원가 (원)" error={errors.price}>
            <div className="mt-2">
              <input
                type="number"
                name="price"
                value={formData.price === 0 ? '' : formData.price}
                onChange={handleChange}
                className={inputStyle}
                placeholder="가격을 입력하세요"
              />
            </div>
          </ProductFormField>

          <ProductFormField label="할인율 (%)" error={errors.discount_rate}>
            <div className="mt-2">
              <input
                type="number"
                name="discount_rate"
                value={
                  formData.discount_rate === 0 ? '' : formData.discount_rate
                }
                onChange={handleChange}
                className={inputStyle}
                placeholder="0"
              />
            </div>
          </ProductFormField>
        </section>

        <section className="flex items-center justify-between rounded-md border border-[#D1D5DC] bg-gray-50 p-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              최종 판매가
            </span>
            <p className="text-xs text-gray-400 line-through">
              {formData.price.toLocaleString()}원
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-black">
              {finalPrice.toLocaleString()}원
            </span>
          </div>
        </section>
      </div>
    </Modal>
  )
}
