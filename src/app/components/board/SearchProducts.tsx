'use client'
import { useActionState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import SearchProductsAction, { SearchState } from '@/api/searchProducts'
import { useInquireStore } from '@/store/useInquireStore'

const initialState: SearchState = { success: false, message: '', data: [] }

interface SearchProductsProps {
  onSelectClose?: () => void
}

export default function SearchProducts({ onSelectClose }: SearchProductsProps) {
  const [state, formAction, isPending] = useActionState(
    SearchProductsAction,
    initialState,
  )

  const { selectedProduct, setSelectedProduct } = useInquireStore()

  function handleAddProduct(item: string) {
    setSelectedProduct(item)
    if (onSelectClose) onSelectClose()
  }

  return (
    <div>
      <form action={formAction} className="flex gap-4">
        <input
          type="text"
          name="name"
          className="w-full rounded-xl border-2 pl-4"
          placeholder="제품명을 입력해주세요"
          disabled={isPending}
        />

        <button
          type="submit"
          disabled={isPending}
          className="flex h-12 w-12 items-center justify-center disabled:opacity-50"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <Search />}
        </button>
      </form>

      {!state.success && state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}

      <ul className="mt-4 flex flex-col gap-2">
        {state.data && state.data.length > 0
          ? state.data.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
              >
                <p className="font-bold">{item.name}</p>
                <button
                  type="button"
                  onClick={() => handleAddProduct(item.id)}
                  className={`rounded-lg px-4 py-2 text-sm ${
                    selectedProduct === item.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {selectedProduct === item.id ? '선택됨' : '선택하기'}
                </button>
              </li>
            ))
          : state.success && (
              <li className="p-4 text-gray-500">검색 결과가 없습니다.</li>
            )}
      </ul>
    </div>
  )
}
