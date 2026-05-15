export interface ReviewUser {
  id: string
  nickname: string
}

export interface Imageinterface {
  src: string
  alt: string | null
}

export interface Reviews {
  id: string

  user_id: string
  product_id: string

  title: string
  content: string

  grade: number

  images: Imageinterface[]

  created_at: string
  updated_at: string

  users: ReviewUser
}
