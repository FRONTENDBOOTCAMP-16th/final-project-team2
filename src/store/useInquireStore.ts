import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  price: number
  thumbnail_image: string
}

interface InquireState {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
}

export const useInquireStore = create<InquireState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}))
