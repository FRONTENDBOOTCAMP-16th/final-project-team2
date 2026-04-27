"use client";

import { useState } from "react";
import ProfileForm from "./components/ProfileForm";
import ImageUploader from "./components/ImageUploader";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "홍길동",
    email: "user01@example.com",
    nickname: "행쇼마켓너무좋아요",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    birthday: "1990-01-01",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="p-8 bg-white mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">프로필 수정</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-red-400 text-white px-4 py-2"
        >
          {isEditing ? "저장하기" : "수정"}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <ImageUploader
          label="프로필 이미지"
          defaultImage={formData.profileImage}
        />
        <ProfileForm
          label="이메일"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          disabled={!isEditing}
          readOnly={true}
        />
        <ProfileForm
          label="이름"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={!isEditing}
          readOnly={true}
        />
        <ProfileForm
          label="닉네임"
          name="nickname"
          type="text"
          value={formData.nickname}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileForm
          label="휴대전화"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileForm
          label="주소"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <ProfileForm
          label="생일"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          disabled={!isEditing}
          readOnly={true}
        />
        <button
          type="button"
          className="text-white w-[672px] h-[50px] bg-black cursor-pointer"
        >
          비밀번호 변경
        </button>
        <button
          type="button"
          className="text-white w-22 h-8 bg-red-700 cursor-pointer"
        >
          회원 탈퇴
        </button>
      </div>
    </section>
  );
}
