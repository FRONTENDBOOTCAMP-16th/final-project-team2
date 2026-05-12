import { useState } from "react";
import { SellerProduct } from "@/app/mypage/types/sellerOrderItems";
import { productUpdateSchema } from "@/app/mypage/types/productSchema";
import useOptionForm from "./useOptionForm";

export const useProductEdit = (product: SellerProduct, onClose: () => void) => {
  const [formData, setFormData] = useState({
    state: product.state || "판매중",
    inventory: product.inventory || 0,
    price: product.price || 0,
    discount_rate: product.discount_rate || 0,
    category: "",
  });

  const optionForm = useOptionForm(product.options || []);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // 재고 입력 시 에러 지우는 것과 똑같은 로직의 함수
  const clearOptionError = () => {
    if (errors.options) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.options;
        return next;
      });
    }
  };

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    let nextValue: string | number = value;

    if (type === "number") {
      nextValue = value === "" ? 0 : Number(value);
      if (nextValue < 0) nextValue = 0;
      // 할인율 최대치 제한 로직
      if (name === "discount_rate" && nextValue > 100) nextValue = 100;
    }

    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    // 사용자가 값을 입력하면 해당 필드의 에러 메시지 삭제
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 검증을 위해 모든 데이터(기본정보 + 옵션)를 하나의 객체로 합침
    const allData = {
      ...formData,
      options: optionForm.state.options,
    };

    const result = productUpdateSchema.safeParse(allData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });

      setErrors(formattedErrors);
      console.error("유효성 검사 실패 목록:", formattedErrors);
      return;
    }

    // TODO. 검증 통과 시 실행 (Supabase 연동 로직이 들어갈 자리)
    console.log("서버로 전송할 최종 데이터:", result.data);

    alert("상품 정보가 성공적으로 수정되었습니다.");
    onClose();
  };

  const finalPrice = Math.floor(
    formData.price * (1 - formData.discount_rate / 100),
  );

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    finalPrice,
    optionForm,
    clearOptionError,
  };
};
