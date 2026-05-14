'use client'

import { Pen, Check } from 'lucide-react'
import useFormManagement from '@/hooks/useFormManagement'
import ImageUploader from '../../consumer/profile/components/ImageUploader'
import ProfileForm from '../../consumer/profile/components/ProfileForm'
import ProfileAction from '../../consumer/profile/components/ProfileAction'
import { useUser } from '@/app/mypage/context/UserContext'
import { ConsumerInfoData, profileSchema } from '../../types/infoSchema'
import { useUserProfile } from './hooks/useUserProfile'

const PROFILE_FIELDS = [
  { label: '이메일', name: 'email', type: 'email', isReadOnly: true },
  { label: '이름', name: 'name', type: 'text', isReadOnly: false },
  { label: '닉네임', name: 'nickname', type: 'text', isReadOnly: false },
  { label: '휴대전화', name: 'phone', type: 'tel', isReadOnly: false },
  { label: '주소', name: 'address', type: 'text', isReadOnly: false },
  { label: '생일', name: 'birthday', type: 'date', isReadOnly: false },
] as const

export default function Profile() {
  const { user } = useUser()

  const initialData: ConsumerInfoData = {
    profileImage: '',
    name: '',
    email: '',
    nickname: '',
    phone: '',
    address: '',
    birthday: '',
  }

  const validate = (data: ConsumerInfoData) => {
    const result = profileSchema.safeParse(data)
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message
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
    setFormData,
  } = useFormManagement<ConsumerInfoData>(initialData, validate)

  // 커스텀 훅 연결
  const { saveUserProfile } = useUserProfile({
    user: user ? { id: user.id } : null,
    setFormData,
  })

  const handleSaveSuccess = async (data: ConsumerInfoData) => {
    try {
      await saveUserProfile(data)
      alert('프로필이 수정되었습니다.')
    } catch (error) {
      console.error('저장 에러:', error)
      alert('저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <section className="w-full max-w-4xl bg-white p-8">
      <form onSubmit={(e) => handleSubmit(e, handleSaveSuccess)}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">프로필 수정</h1>
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
                  : 'bg-red-400 hover:bg-red-500'
              } px-6 py-2 font-medium text-white transition`}
            >
              <div className="flex items-center gap-2">
                {isEditing ? <Check size={16} /> : <Pen size={16} />}
                {isEditing ? '저장하기' : '수정하기'}
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <ImageUploader
            label="프로필 이미지"
            defaultImage={formData.profileImage}
            onUploadSuccess={(url) => {
              console.log('업로드된 이미지 URL:', url)
              setFormData((prev) => ({ ...prev, profileImage: url }))
            }}
            isEditing={isEditing}
          />

          {PROFILE_FIELDS.map((field) => (
            <ProfileForm
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={String(
                formData[field.name as keyof ConsumerInfoData] || '',
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
