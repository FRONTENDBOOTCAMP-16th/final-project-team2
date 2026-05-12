'use client'

import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";
import { ProductFormField } from "./ProductFormField";
import { useProductEdit } from "@/hooks/useProductEdit";
import CategorySelector from "../../register/components/CategorySelector";
import OptionInput from "../../register/components/OptionInput";
import ImageUploader from "@/app/mypage/consumer/profile/components/ImageUploader";

interface Props {
  product: SellerProduct
  onClose: () => void
}

export default function ProductEditModal({ product, onClose }: Props) {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    finalPrice,
    optionForm,
    clearOptionError,
  } = useProductEdit(product, onClose);

  const inputStyle =
    "w-full border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[800px] rounded-md shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">상품 정보 수정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
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
            </ProductFormField>

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
          </section>

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
                {finalPrice.toLocaleString()}원
              </span>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-200 flex gap-3 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 border border-[#D1D5DC] text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-4 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-[0.98]"
          >
            정보 수정 완료
          </button>
        </div>
      </div>
    </div>
  )
}
