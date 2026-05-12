import { z } from "zod";

export const productUpdateSchema = z.object({
  state: z.string().min(1, "판매 상태를 선택해주세요."),
  inventory: z
    .number()
    .min(1, "재고는 1개 이상이어야 합니다.")
    .max(100, "재고는 최대 100개까지만 입력 가능합니다."),
  price: z.number().min(1, "원가를 입력해주세요."),
  discount_rate: z.number().min(0).max(100),
  options: z.array(z.any()).min(1, "최소 하나 이상의 옵션을 추가해주세요."),
  category: z.string().min(1, "카테고리를 설정해주세요."),
});
