import { useState, SyntheticEvent, ChangeEvent, MouseEvent } from "react";

/**
 * [useFormManagement]
 * 마이페이지 프로필, 판매자 상점 관리 폼에서 공통으로 사용하는 로직입니다.
 */
export default function useFormManagement<T extends Record<string, unknown>>(
  initialData: T,
  validate: (data: T) => Record<string, string>,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backupData, setBackupData] = useState<T>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof T;
    const value = e.target.value;

    if (errors[name as string]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "phone") {
      const onlyNumber = value.replace(/[^0-9]/g, "").slice(0, 11);
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNumber as T[keyof T],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value as T[keyof T],
    }));
  };

  const handleEdit = (e: MouseEvent) => {
    e.preventDefault();
    setBackupData(formData);
    setIsEditing(true);
  };

  const handleCancel = (e: MouseEvent) => {
    e.preventDefault();
    setFormData(backupData);
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (e: SyntheticEvent, onSuccess: (data: T) => void) => {
    e.preventDefault();
    const newErrors = validate(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsEditing(false);
    setErrors({});
    onSuccess(formData);
  };

  return {
    formData,
    isEditing,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSubmit,
    setFormData,
  };
}
