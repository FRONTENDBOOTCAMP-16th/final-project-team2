'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Modal from '../components/Modal'

export default function AuthGuardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // 미들웨어에서 넘겨준 정보들 확인
  const type = searchParams.get('type') // 'login_required' 또는 'invalid_role'
  const next = searchParams.get('next') // 원래 가려던 주소

  const handleClose = () => {
    router.push('/')
  }

  const handleGoLogin = () => {
    router.push(`/login?next=${encodeURIComponent(next || '/')}`)
  }

  const isLoginRequired = type === 'login_required'

  return (
    <div className="min-h-screen bg-gray-50/50 backdrop-blur-sm">
      <Modal
        isOpen={true}
        onClose={handleClose}
        title={isLoginRequired ? '로그인이 필요합니다' : '접근 권한이 없습니다'}
        footer={
          <div className="flex w-full justify-center gap-3">
            <button
              onClick={handleClose}
              className="rounded-xl border border-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={isLoginRequired ? handleGoLogin : handleClose}
              className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              {isLoginRequired ? '로그인하러 가기' : '확인'}
            </button>
          </div>
        }
      >
        <div className="py-4 text-center">
          <p className="text-lg leading-relaxed text-gray-600">
            {isLoginRequired
              ? '이 서비스는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?'
              : '해당 페이지를 볼 수 있는 권한이 없습니다.\n본인의 마이페이지를 이용해주세요.'}
          </p>
        </div>
      </Modal>
    </div>
  )
}
