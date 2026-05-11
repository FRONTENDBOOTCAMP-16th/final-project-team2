"use client";

import ImageUploader from "@/app/mypage/consumer/profile/components/ImageUploader";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";
import { ProductFormField } from "./ProductFormField";
import { useProductEdit } from "@/hooks/useProductEdit";

interface Props {
  product: SellerProduct;
  onClose: () => void;
}

export default function ProductEditModal({ product, onClose }: Props) {
  const { formData, errors, handleChange, handleSubmit, finalPrice } =
    useProductEdit(product, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-[480px] p-8 rounded-lg shadow-2xl overflow-y-auto max-h-[95vh]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            상품 정보 수정
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <svg
              className="w-6 h-6"
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

        <div className="space-y-10">
          <div className="border border-dashed border-gray-200 p-6 rounded-md bg-gray-50/30">
            <ImageUploader
              key={product.id}
              label="상품 이미지"
              defaultImage={product.thumbnail_image}
            />
          </div>

          <div className="space-y-8">
            <ProductFormField label="판매 상태" error={errors.state}>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors bg-transparent cursor-pointer text-sm font-medium"
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
                value={formData.inventory === 0 ? "" : formData.inventory}
                onChange={handleChange}
                placeholder="0"
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
              />
            </ProductFormField>

            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <ProductFormField label="원가 (원)" error={errors.price}>
                  <input
                    type="number"
                    name="price"
                    value={formData.price === 0 ? "" : formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </ProductFormField>
              </div>
              <div className="flex-1">
                <ProductFormField label="할인율 (%)">
                  <input
                    type="number"
                    name="discount_rate"
                    value={
                      formData.discount_rate === 0 ? "" : formData.discount_rate
                    }
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
                  />
                </ProductFormField>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-sm flex justify-between items-center border border-gray-100 mt-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                  예상 판매가
                </span>
                <p className="text-xs text-gray-400 line-through font-normal">
                  {formData.price.toLocaleString()}원
                </p>
              </div>
              <span className="text-xl font-bold text-black">
                {finalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-12">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all rounded-sm"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-4 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-all rounded-sm shadow-md active:scale-[0.98]"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
