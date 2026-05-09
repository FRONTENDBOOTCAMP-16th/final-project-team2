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
import useOptionForm from "@/hooks/useOptionForm";

type ProductErrors = {
  productImage?: string;
  productName?: string;
  productPrice?: string;
  productDescription?: string;
  productInventory?: string;
  productDiscount?: string;
  productOptions?: string;
};

export default function RegisterProductForm() {
  // 서버 액션
  const [formState, formAction] = useActionState<FormState, FormData>(
    registerProductActionWithState,
    null, // 폼 상태 초기값
  );

  const [form, setForm] = useState<Partial<ProductForm>>({
    productName: "",
    productPrice: "",
    productDescription: "",
    productInventory: "",
    productDiscount: "",
  });
  const serverErrors = formState?.errors;
  const [clientErrors, setClientErrors] = useState<ProductErrors>({});

  //옵션 상태
  const optionForm = useOptionForm();

  const validateAll = () => {
    const newErrors: ProductErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      const error = validateProductForm(key as keyof ProductForm, value);

      if (error) {
        newErrors[key as keyof ProductErrors] = error;
      }
    });

    if (optionForm.state.options.length === 0) {
      newErrors.productOptions = "옵션을 추가하세요.";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    const newErrors = validateAll();

    setClientErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
    }
  };

  const handleInputChange = <T extends keyof ProductForm>(
    name: T,
    value: ProductForm[T],
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = <T extends keyof ProductForm>(name: T) => {
    const value = form[name];
    if (value === undefined) return;
    const error = validateProductForm(name, value);

    setClientErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 px-6"
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">상품 등록 페이지</h2>
        <SubmitButton />
      </div>

      <div className="flex flex-col gap-y-6 ">
        <ProductImg
          error={clientErrors.productImage || serverErrors?.productImage}
        />
        <ProductName
          value={form.productName ?? ""}
          error={clientErrors.productName || serverErrors?.productName}
          onChange={(value) => handleInputChange("productName", value)}
          onBlur={() => handleBlur("productName")}
        />
        <ProductPrice
          value={form.productPrice ?? ""}
          error={clientErrors.productPrice || serverErrors?.productPrice}
          onChange={(value) => handleInputChange("productPrice", value)}
          onBlur={() => handleBlur("productPrice")}
        />
        <ProductDescription
          value={form.productDescription ?? ""}
          error={
            clientErrors.productDescription || serverErrors?.productDescription
          }
          onChange={(value) => handleInputChange("productDescription", value)}
          onBlur={() => handleBlur("productDescription")}
        />
        <ProductInventory
          value={form.productInventory ?? ""}
          error={
            clientErrors.productInventory || serverErrors?.productInventory
          }
          onChange={(value) => handleInputChange("productInventory", value)}
          onBlur={() => handleBlur("productInventory")}
        />
        <ProductDiscount
          value={form.productDiscount ?? ""}
          error={clientErrors.productDiscount || serverErrors?.productDiscount}
          onChange={(value) => handleInputChange("productDiscount", value)}
          onBlur={() => handleBlur("productDiscount")}
        />
        <OptionInput optionForm={optionForm} />
      </div>
    </form>
  );
}
