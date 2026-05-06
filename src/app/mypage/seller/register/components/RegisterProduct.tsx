"use client";
import OptionInput from "./OptionInput";
import ProductName from "./ProductName";
import ProductImg from "./ProductImg";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import ProductInventory from "./ProductInventory";
import ProductDiscount from "./ProductDiscount";
import SubmitButton from "./SubmitButton";
import {
  FormState,
  registerProductActionWithState,
} from "../actions/registerProduct";
import { useActionState, useState } from "react";
import validateProductForm, { ProductForm } from "../lib/validateProductForm";

type ProductErrors = {
  productImage?: string;
  productName?: string;
  productPrice?: string;
  productDescription?: string;
  productInventory?: string;
  productDiscount?: string;
};

export default function RegisterProductForm() {
  // 서버 액션
  const [formState, formAction] = useActionState<FormState, FormData>(
    registerProductActionWithState, // RCC용 서버 액션(함수)
    null, // 폼 상태 초기값
  );
  // 클라이언트 함수
  const [form, setForm] = useState({
    productImage: null as File | null,
    productName: "",
    productPrice: "",
    productDescription: "",
    productInventory: "",
    productDiscount: "",
  });

  const serverErrors = formState?.errors;
  const [clientErrors, setClientErrors] = useState<ProductErrors>({});

  const handleInputChange = <T extends keyof ProductForm>(
    name: T,
    value: ProductForm[T],
  ) => {
    // form 업데이트
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // validation 실행
    const error = validateProductForm(name, value);

    // errors 업데이트
    setClientErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <form action={formAction} className="flex flex-col gap-6 px-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">상품 등록 페이지</h2>
        <SubmitButton />
      </div>

      <div className="flex flex-col gap-y-6 ">
        <ProductImg
          value={form.productImage}
          error={clientErrors.productImage || serverErrors?.productImage}
          onChange={(file) => handleInputChange("productImage", file)}
        />
        <ProductName
          value={form.productName}
          error={clientErrors.productName || serverErrors?.productName}
          onChange={(value) => handleInputChange("productName", value)}
        />
        <ProductPrice
          value={form.productPrice}
          error={clientErrors.productPrice || serverErrors?.productPrice}
          onChange={(value) => handleInputChange("productPrice", value)}
        />
        <ProductDescription
          value={form.productDescription}
          error={
            clientErrors.productDescription || serverErrors?.productDescription
          }
          onChange={(value) => handleInputChange("productDescription", value)}
        />
        <ProductInventory
          value={form.productInventory}
          error={
            clientErrors.productInventory || serverErrors?.productInventory
          }
          onChange={(value) => handleInputChange("productInventory", value)}
        />
        <ProductDiscount
          value={form.productDiscount}
          error={clientErrors.productDiscount || serverErrors?.productDiscount}
          onChange={(value) => handleInputChange("productDiscount", value)}
        />
        <OptionInput />
      </div>
    </form>
  );
}
