export type Option = {
  name: string
  values: string[]
}

export type ProductForm = {
  productImage: File | null
  productName: string
  productPrice: string
  productDescription: string
  productInventory: string
  productDiscount: string
  productOptions: Option[]
  productCategoryId?: string
}

const validators: Partial<
  Record<keyof ProductForm, (value: string) => string>
> = {
  productName: (value) => {
    if (!value) return '상품명을 입력하세요.'
    if (value.length < 3) return '최소 3자 이상 입력해야 합니다.'
    return ''
  },
  productPrice: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return '가격을 입력하세요.'
    if (!/^\d+$/.test(trimmed)) return '숫자만 입력하세요.'
    if (Number(trimmed) <= 5000)
      return '최소 금액은 5000원 이상부터 입력 가능합니다.'
    return ''
  },
  productDescription: (value) => {
    const text = value.trim()
    if (!text) return '상품 정보를 입력하세요.'
    if (!/^[가-힣0-9\s\n.,!?~"'""''%]+$/.test(text))
      return '한글만 입력 가능합니다.'
    if (text.length < 10) return '최소 10자 이상 입력해야 합니다.'
    if (text.length > 500) return '최대 500자까지 입력 가능합니다.'
    return ''
  },
  productInventory: (value) => {
    const trimmed = value.trim()
    if (!trimmed) return '상품 재고를 입력하세요.'
    if (!/^\d+$/.test(trimmed)) return '숫자만 입력하세요.'
    if (Number(trimmed) < 10 || Number(trimmed) > 100)
      return '상품 재고는 10 ~ 100 사이만 가능합니다.'
    return ''
  },
  productDiscount: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "상품 할인율을 입력하세요.";
    if (!/^\d+$/.test(trimmed)) return "숫자만 입력하세요.";
    if (Number(trimmed) < 0 || Number(trimmed) > 100)
      return "상품 할인율은 0%부터 100%까지 입력 가능합니다.";
    return "";
  },
  productCategoryId: (value) => {
    if (!value.trim()) return '카테고리를 선택하세요.'
    return ''
  },
}

export default function validateProductForm<T extends keyof ProductForm>(
  name: T,
  value: ProductForm[T],
): string {
  if (typeof value !== 'string') return '잘못된 값입니다.'
  return validators[name]?.(value) ?? ''
}
