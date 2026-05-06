"use server";

import { redirect } from "next/navigation";

export type FormState = {
  errors: {
    productImage?: string;
    productName?: string;
    productPrice?: string;
    productDescription?: string;
    productInventory?: string;
    productDiscount?: string;
    productOptions?: string;
  };
} | null;

export async function registerProductAction(formData: FormData) {
  const result = await processRegister(formData);

  if (result !== null) {
    console.error(result.errors);
    return;
  }

  redirect("/mypage/seller/products");
}

export async function registerProductActionWithState(
  prevState: FormState,
  formData: FormData,
) {
  return await processRegister(formData);
}

async function processRegister(formData: FormData): Promise<FormState> {
  const errors: NonNullable<FormState>["errors"] = {};

  const imageFile = formData.get("productImage") as File;
  const name = formData.get("productName")?.toString().trim();
  const priceRaw = formData.get("productPrice")?.toString();
  const description = formData.get("productDescription")?.toString().trim();
  const inventory = formData.get("productInventory")?.toString();
  const discount = formData.get("productDiscount")?.toString();
  const optionsRaw = formData.get("productOptions")?.toString() ?? "[]";

  // 이미지
  if (!imageFile || imageFile.size === 0) {
    errors.productImage = "이미지를 업로드해야 합니다.";
  } else if (imageFile.size > 5 * 1024 * 1024) {
    errors.productImage = "5MB 이하 이미지만 업로드 가능합니다.";
  }

  // 이름
  if (!name) {
    errors.productName = "상품명을 입력하세요.";
  }

  // 가격
  if (!priceRaw || isNaN(Number(priceRaw))) {
    errors.productPrice = "가격을 올바르게 입력하세요.";
  }

  // 설명
  if (!description) {
    errors.productDescription = "상품 정보를 입력하세요.";
  }

  // 재고
  if (inventory === null || inventory === "" || isNaN(Number(inventory))) {
    errors.productInventory = "상품 재고를 올바르게 입력하세요.";
  }

  // 할인율
  if (discount === null || discount === "" || isNaN(Number(discount))) {
    errors.productDiscount = "할인율을 올바르게 입력하세요.";
  }

  // 옵션
  try {
    JSON.parse(optionsRaw);
  } catch {
    errors.productOptions = "옵션 데이터가 올바르지 않습니다.";
  }

  // 👉 에러 하나라도 있으면 반환
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const fakeImageUrl = `/temp/${Date.now()}-${imageFile.name}`;

  console.log({
    name,
    price: Number(priceRaw),
    imageUrl: fakeImageUrl,
  });

  return null;
}
