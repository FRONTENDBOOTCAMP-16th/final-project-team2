import { create } from 'zustand'

interface InquireState {
  selectedProduct: string;
  setSelectedProduct: (product: string) => void;
}

export const useInquireStore = create<InquireState>((set) => ({
  selectedProduct: '',
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}))