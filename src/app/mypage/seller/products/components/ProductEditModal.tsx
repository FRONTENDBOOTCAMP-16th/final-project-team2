"use client";

import { useState } from "react";
import { z } from "zod";
import ImageUploader from "@/app/mypage/consumer/profile/components/ImageUploader";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";

const productUpdateSchema = z.object({
  state: z.string().min(1, "판매 상태를 선택해주세요."),
  inventory: z.number().min(0, "재고는 0개 이상이어야 합니다."),
  price: z.number().min(1, "원가를 입력해주세요."),
  discount_rate: z.number().min(0).max(100),
});

interface Props {
  product: SellerProduct;
  onClose: () => void;
}

export default function ProductEditModal({ product, onClose }: Props) {
  const [formData, setFormData] = useState({
    state: product.state,
    inventory: product.inventory,
    price: product.price,
    discount_rate: product.discount_rate,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let nextValue: string | number = value;

    if (type === "number") {
      // 숫자를 다 지웠을 때 빈 칸을 0으로 처리
      nextValue = value === "" ? 0 : Number(value);

      // 음수 입력 방지
      if (nextValue < 0) nextValue = 0;

      // 할인율 100% 초과 방지 (에러 메시지 대신 값을 강제 고정)
      if (name === "discount_rate" && nextValue > 100) nextValue = 100;
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    // 입력 시 해당 필드의 에러 메시지 실시간 삭제
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Zod를 활용한 유효성 검사 및 제출 로직
  const handleSubmit = () => {
    const result = productUpdateSchema.safeParse(formData);

    if (!result.success) {
      // 복잡한 Zod 에러 배열을 { 필드명: 메시지 } 객체 형태로 평탄화
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;

        if (fieldName !== "discount_rate") {
          formattedErrors[fieldName] = issue.message;
        }
      });

      setErrors(formattedErrors);
      return;
    }

    // 검증 성공 시 실행할 로직
    // TODO : supabase 연동
    onClose();
  };
  // 최종 금액 계산
  const finalPrice = Math.floor(
    formData.price * (1 - formData.discount_rate / 100),
  );

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
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 ml-1">
                판매 상태
              </label>
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
              {errors.state && (
                <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">
                  {errors.state}
                </p>
              )}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 ml-1">
                재고 수량
              </label>
              <input
                type="number"
                name="inventory"
                // 값이 0일 때 빈 칸으로 표시하여 015 같은 입력 방지
                value={formData.inventory === 0 ? "" : formData.inventory}
                onChange={handleChange}
                placeholder="0"
                className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
              />
              {errors.inventory && (
                <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">
                  {errors.inventory}
                </p>
              )}
            </div>

            {/* 원가 & 할인율 */}
            <div className="flex gap-8 items-start">
              <div className="flex-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 ml-1">
                  원가 (원)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price === 0 ? "" : formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full border-b border-gray-200 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
                />
                {errors.price && (
                  <p className="text-red-500 text-[10px] mt-1.5 ml-1 font-medium">
                    {errors.price}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2 ml-1">
                  할인율 (%)
                </label>
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
              <span className="text-xl font-bold text-black font-mono">
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
            className="flex-1 py-4 bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-all rounded-sm shadow-md active:scale-[0.98]"
          >
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
