export type Option = {
  name: string;
  values: string[];
};

export type ProductForm = {
  productImage: File | null;
  productName: string;
  productPrice: string;
  productDescription: string;
  productInventory: string;
  productDiscount: string;
  productOptions: Option[];
  productCategoryId?: string;
};
export default function validateProductform<T extends keyof ProductForm>(
  name: T,
  value: ProductForm[T],
) {
  // 이름
  if (name === "productName") {
    if (typeof value !== "string") return "잘못된 값입니다.";
    if (!value) return "상품명을 입력하세요.";
    if (value.length < 3) return "최소 3자 이상 입력해야 합니다.";
    return "";
  }

  // 가격
  if (name === "productPrice") {
    if (typeof value !== "string") return "잘못된 값입니다.";

    const trimmed = value.trim();

    if (!trimmed) {
      return "가격을 입력하세요.";
    }

    // 숫자만 허용 (정수)
    if (!/^\d+$/.test(trimmed)) {
      return "숫자만 입력하세요.";
    }

    const num = Number(trimmed);

    if (num <= 5000) {
      return "최소 금액은 5000원 이상부터 입력 가능합니다.";
    }

    return "";
  }

  // 설명
  if (name === "productDescription") {
    if (typeof value !== "string") return "잘못된 값입니다.";

    const text = value.trim();
    if (!text) {
      return "상품 정보를 입력하세요.";
    }
    if (!/^[가-힣\s\n.,!?~]+$/.test(text)) {
      return "한글만 입력 가능합니다.";
    }

    if (text.length < 10) {
      return "최소 10자 이상 입력해야 합니다.";
    }

    if (text.length > 500) {
      return "최대 500자까지 입력 가능합니다.";
    }

    return "";
  }

  // 재고
  if (name === "productInventory") {
    if (typeof value !== "string") return "잘못된 값입니다.";

    const trimmed = value.trim();

    if (!trimmed) {
      return "상품 재고를 입력하세요.";
    }

    if (!/^\d+$/.test(trimmed)) {
      return "숫자만 입력하세요.";
    }

    const num = Number(trimmed);

    if (num < 10 || num > 100) {
      return "상품 재고는 10 ~ 100 사이만 가능합니다.";
    }

    return "";
  }

  // 할인율
  if (name === "productDiscount") {
    if (typeof value !== "string") return "잘못된 값입니다.";

    const trimmed = value.trim();
    if (!trimmed) {
      return "상품 할인율을 입력하세요.";
    }
    if (!/^\d+$/.test(trimmed)) {
      return "숫자만 입력하세요.";
    }

    const num = Number(trimmed);

    if (num < 0 || num > 70) {
      return "상품 할인율은 0%부터 70%까지 입력 가능합니다.";
    }
    return "";
  }

  // 카테고리
  if (name === "productCategoryId") {
    if (typeof value !== "string") return "잘못된 값입니다.";
    const trimmed = value.trim();
    if (!trimmed) {
      return "카테고리를 선택하세요.";
    }
    return "";
  }

  // 옵션
  if (name === "productOptions") {
    if (typeof value !== "string") return "잘못된 값입니다.";
    const trimmed = value.trim();
    if (!trimmed) {
      return "옵션 값을 입력하세요.";
    }
    return "";
  }
}
