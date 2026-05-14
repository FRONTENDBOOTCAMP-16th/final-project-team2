'use client'

import { z } from 'zod'
import { Pen, Check } from 'lucide-react'
import useFormManagement from '@/hooks/useFormManagement'
import ImageUploader from '../../consumer/profile/components/ImageUploader'
import ProfileForm from '../../consumer/profile/components/ProfileForm'
import ProfileAction from '../../consumer/profile/components/ProfileAction'

const sellerInfoSchema = z.object({
  phone: z
    .string()
    .min(1, '전화번호를 입력해주세요.')
    .min(10, '전화번호가 너무 짧습니다.'),
  location: z.string().min(1, '가게 주소를 입력해주세요.'),
  intro: z.string().min(1, '소개글을 입력해주세요.'),
  profileImage: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
})

const PROFILE_FIELDS = [
  { label: '이메일', name: 'email', type: 'email', isReadOnly: true },
  { label: '가게명', name: 'name', type: 'text', isReadOnly: true },
  { label: '휴대전화', name: 'phone', type: 'tel', isReadOnly: false },
  { label: '가게 주소', name: 'location', type: 'text', isReadOnly: false },
  { label: '소개글', name: 'intro', type: 'text', isReadOnly: false },
]

export default function Info() {
  const initialData = {
    profileImage: '',
    email: 'seller@example.com',
    name: '예찌마켓',
    phone: '01012345678',
    location: '서울시 종로구 광화문 D타워',
    intro: '예찌마켓에 어서오세요 :)',
  }

  const validate = (data: typeof initialData) => {
    const result = sellerInfoSchema.safeParse(data)

    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        newErrors[fieldName] = issue.message
      })
      return newErrors
    }
    return {}
  }

  const {
    formData,
    isEditing,
    errors,
    handleChange,
    handleEdit,
    handleCancel,
    handleSubmit,
  } = useFormManagement(initialData, validate)

  const handleSaveSuccess = (data: typeof initialData) => {
    console.log('판매자 정보 저장:', data)
    alert('상점 정보가 수정되었습니다.')
  }

  return (
    <section className="mb-11.25 w-full max-w-4xl bg-white p-8">
      <form onSubmit={(e) => handleSubmit(e, handleSaveSuccess)}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">상점 정보 관리</h1>
          <div className="flex gap-2">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
              >
                취소
              </button>
            )}
            <button
              type={isEditing ? 'submit' : 'button'}
              onClick={!isEditing ? handleEdit : undefined}
              className={`${
                isEditing
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-black hover:bg-red-500'
              } px-6 py-2 font-medium text-white transition`}
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
            label="상점 로고 이미지"
            defaultImage={formData.profileImage as string}
          />

          {PROFILE_FIELDS.map((field) => (
            <ProfileForm
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={String(
                formData[field.name as keyof typeof formData] || '',
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
  )
}
