export interface BoardCard {
  id: string
  title: string
  created_at: string
  writer_id?: string // 작성자 ID (권한 체크용)
  important?: boolean // 공지사항 전용 (QnA에는 없을 수 있으므로 옵셔널)
  content?: string

  // 공통 작성자 정보 (이름 통일)
  writer?: {
    nickname: string
    email?: string
    profile_image?: string
  }

  // QnA 전용 상품 정보 (공지사항에는 없으므로 옵셔널)
  product?: {
    id: string
    name: string
    thumbnail_image: string
    price: number
    store_id?: string
  }

  question_content?: string
  answer_content?: string
  answered_at?: string
  is_answered?: boolean
}

export interface FormState {
  success: boolean
  message: string
}

// 공지사항용
export interface NoticeResponse {
  importantData: BoardCard[]
  normalData: BoardCard[]
  normalCount: number
}
