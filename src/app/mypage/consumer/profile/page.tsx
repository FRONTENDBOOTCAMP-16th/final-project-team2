"use client";

import { Pen, Check } from "lucide-react";
import useFormManagement from "@/hooks/useFormManagement";
import ImageUploader from "../../consumer/profile/components/ImageUploader";
import ProfileForm from "../../consumer/profile/components/ProfileForm";
import ProfileAction from "../../consumer/profile/components/ProfileAction";

const PROFILE_FIELDS = [
  { label: "이메일", name: "email", type: "email", isReadOnly: true },
  { label: "이름", name: "name", type: "text", isReadOnly: true },
  { label: "닉네임", name: "nickname", type: "text", isReadOnly: false },
  { label: "휴대전화", name: "phone", type: "tel", isReadOnly: false },
  { label: "주소", name: "address", type: "text", isReadOnly: false },
  { label: "생일", name: "birthday", type: "date", isReadOnly: true },
];

export default function Profile() {
  const initialData = {
    profileImage: "",
    name: "홍길동",
    email: "user01@example.com",
    nickname: "행쇼마켓너무좋아요",
    phone: "01012345678",
    address: "서울시 강남구 테헤란로 123",
    birthday: "1990-01-01",
  };

  const validate = (data: typeof initialData) => {
    const newErrors: Record<string, string> = {};
    if (!data.nickname.trim()) newErrors.nickname = "닉네임을 입력해주세요.";
    if (!data.phone.trim()) newErrors.phone = "전화번호를 입력해주세요.";
    if (data.phone.length < 10 && data.phone.length > 0)
      newErrors.phone = "전화번호가 너무 짧습니다.";
    if (!data.address.trim()) newErrors.address = "주소를 입력해주세요.";
    return newErrors;
  };

  const {
    formData,
    isEditing,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSubmit,
  } = useFormManagement(initialData, validate);

  // 저장 성공 시 실행할 로직
  const handleSaveSuccess = (data: typeof initialData) => {
    console.log("저장할 데이터:", data);
    // TODO : supabase 연동 로직
    alert("프로필이 수정되었습니다.");
  };

  return (
    <section className="p-8 bg-white w-full max-w-4xl">
      {/* handleSubmit 호출 시 handleSaveSuccess를 콜백으로 넘겨줍니다 */}
      <form onSubmit={(e) => handleSubmit(e, handleSaveSuccess)}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">프로필 수정</h1>
          <div className="flex gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                취소
              </button>
            )}
            <button
              type={isEditing ? "submit" : "button"}
              onClick={!isEditing ? handleEdit : undefined}
              className={`${
                isEditing
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-400 hover:bg-red-500"
              } text-white px-6 py-2 font-medium transition`}
            >
              {isEditing ? (
                <span className="flex items-center justify-center gap-2">
                  <Check size={16} strokeWidth={2.5} />
                  저장하기
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Pen size={16} strokeWidth={2.5} />
                  수정하기
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ImageUploader
            label="프로필 이미지"
            defaultImage={formData.profileImage as string}
          />

          {PROFILE_FIELDS.map((field) => (
            <ProfileForm
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={String(
                formData[field.name as keyof typeof formData] || "",
              )}
              onChange={handleChange}
              disabled={!isEditing}
              readOnly={field.isReadOnly}
              error={errors[field.name]}
            />
          ))}
          <ProfileAction />
        </div>
      </form>
    </section>
  );
}
