type UUID = string

export interface SelectedOption {
  color?: string
  size?: string
}

export interface Review {
  id: UUID
  user_id: UUID
  product_id: UUID
  selected_options: SelectedOption[] | null
  quantity: number
  created_at: string
  update_at: string
}
