'use client'

import ImageUploader from '@/app/mypage/consumer/profile/components/ImageUploader'
import { SellerProduct } from '@/app/mypage/types/sellerOrderItems'
import { ProductFormField } from './ProductFormField'
import { useProductEdit } from '@/hooks/useProductEdit'

interface Props {
  product: SellerProduct
  onClose: () => void
}

export default function ProductEditModal({ product, onClose }: Props) {
  const { formData, errors, handleChange, handleSubmit, finalPrice } =
    useProductEdit(product, onClose)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="max-h-[95vh] w-[480px] overflow-y-auto rounded-lg bg-white p-8 shadow-2xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            상품 정보 수정
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-black"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

<<<<<<< HEAD
  <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
    <section>
      <label className="text-sm font-medium mb-3 block">
        상품 이미지
      </label>
      <div className="border border-[#D1D5DC] bg-[#F9FAFB] p-6 rounded-md">
        <ImageUploader
          key={product.id}
          label=""
          defaultImage={product.thumbnail_image}
        />
      </div>
    </section>
=======
        <div className="space-y-10">
      <div className="rounded-md border border-dashed border-gray-200 bg-gray-50/30 p-6">
        <ImageUploader
          key={product.id}
          label="상품 이미지"
          defaultImage={product.thumbnail_image}
        />
      </div>
>>>>>>> 730c7f5 (refactory: 프리티어 설정)

      <section>
        <ProductFormField label="카테고리 설정" error={errors.category}>
          <div className="mt-2">
            <CategorySelector
              onChange={(categoryId) => {
                handleChange({
                  target: { name: "category", value: categoryId },
                } as React.ChangeEvent<
                  HTMLSelectElement | HTMLInputElement
                >);
              }}
            />
          </div>
        </ProductFormField>
      </section>

      <section>
        <ProductFormField label="옵션 설정" error={errors.options}>
          <div onClick={clearOptionError}>
            {" "}
            {/* 클릭이나 변경 시 에러 즉시 삭제 */}
            <OptionInput optionForm={optionForm} />
          </div>
        </ProductFormField>
      </section>

      <section className="grid grid-cols-2 gap-6">
        <ProductFormField label="판매 상태" error={errors.state}>
<<<<<<< HEAD
  <div className="relative mt-2">
    <select
      name="state"
      value={formData.state}
      onChange={handleChange}
      className={`${inputStyle} appearance-none cursor-pointer`}
    >
      <option value="판매중">판매중</option>
      <option value="품절">품절</option>
      <option value="판매중지">판매중지</option>
      <option value="준비중">준비중</option>
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      <svg
        className="w-4 h-4"
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
            </ProductFormField >

            <ProductFormField label="재고 수량" error={errors.inventory}>
              <div className="mt-2">
                <input
                  type="number"
                  name="inventory"
                  value={formData.inventory === 0 ? "" : formData.inventory}
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
                  value={formData.price === 0 ? "" : formData.price}
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
                    formData.discount_rate === 0 ? "" : formData.discount_rate
                  }
                  onChange={handleChange}
                  className={inputStyle}
                  placeholder="0"
                />
              </div>
            </ProductFormField>
          </section >

    <section className="bg-gray-50 p-6 rounded-md border border-[#D1D5DC] flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          최종 판매가
        </span>
        <p className="text-xs text-gray-400 line-through">
          {formData.price.toLocaleString()}원
        </p>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-black">
=======
              <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full cursor-pointer border-b border-gray-200 bg-transparent py-2 text-sm font-medium transition-colors outline-none focus:border-black"
          >
            <option value="">상태 선택</option>
            <option value="판매중">판매중</option>
            <option value="품절">품절</option>
            <option value="판매중지">판매중지</option>
            <option value="준비중">준비중</option>
          </select>
        </ProductFormField>

        <ProductFormField label="재고 수량" error={errors.inventory}>
          <input
            type="number"
            name="inventory"
            value={formData.inventory === 0 ? '' : formData.inventory}
            onChange={handleChange}
            placeholder="0"
            className="w-full border-b border-gray-200 py-2 text-sm font-medium transition-colors outline-none focus:border-black"
          />
        </ProductFormField>

        <div className="flex items-start gap-8">
          <div className="flex-1">
            <ProductFormField label="원가 (원)" error={errors.price}>
              <input
                type="number"
                name="price"
                value={formData.price === 0 ? '' : formData.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full border-b border-gray-200 py-2 text-sm font-medium transition-colors outline-none focus:border-black"
              />
            </ProductFormField>
          </div>
          <div className="flex-1">
            <ProductFormField label="할인율 (%)">
              <input
                type="number"
                name="discount_rate"
                value={
                  formData.discount_rate === 0 ? '' : formData.discount_rate
                }
                onChange={handleChange}
                placeholder="0"
                className="w-full border-b border-gray-200 py-2 text-sm font-medium transition-colors outline-none focus:border-black"
              />
            </ProductFormField>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-sm border border-gray-100 bg-gray-50 p-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold tracking-tight text-gray-400 uppercase">
              예상 판매가
            </span>
            <p className="text-xs font-normal text-gray-400 line-through">
              {formData.price.toLocaleString()}원
            </p>
          </div>
          <span className="font-mono text-xl font-bold text-black">
>>>>>>> 730c7f5 (refactory: 프리티어 설정)
            {finalPrice.toLocaleString()}원
          </span>
        </div>
    </section>
        </div >

<<<<<<< HEAD
    <div className="px-8 py-6 border-t border-gray-200 flex gap-3 bg-white">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 py-4 border border-[#D1D5DC] text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all"
=======
        <div className="mt-12 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-sm border border-gray-200 py-4 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50"
>>>>>>> 730c7f5 (refactory: 프리티어 설정)
      >
        취소
      </button>
      <button
        type="button"
        onClick={handleSubmit}
<<<<<<< HEAD
        className="flex-1 py-4 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-[0.98]"
=======
            className="flex-1 rounded-sm bg-black py-4 text-sm font-semibold text-white shadow-md transition-all hover:bg-neutral-800 active:scale-[0.98]"
>>>>>>> 730c7f5 (refactory: 프리티어 설정)
      >
        정보 수정 완료
      </button>
    </div>
      </div >
    </div >
  )
}
