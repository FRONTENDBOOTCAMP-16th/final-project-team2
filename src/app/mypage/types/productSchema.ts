import { z } from "zod";

export const productUpdateSchema = z.object({
  state: z.string().min(1, "판매 상태를 선택해주세요."),
  inventory: z.number().min(0, "재고는 0개 이상이어야 합니다."),
  price: z.number().min(1, "원가를 입력해주세요."),
  discount_rate: z.number().min(0).max(100),
});
