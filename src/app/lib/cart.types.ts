type UUID = string

export type SelectedOption = Record<string, string[]>
export interface CartItem {
  id: UUID
  user_id: UUID
  product_id: UUID
  selected_options: SelectedOption | null
  quantity: number
  created_at: string
  update_at: string
}
