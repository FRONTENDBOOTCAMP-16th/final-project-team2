import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchFormProps {
  onClose?: () => void
}

// 검색바 컴포넌트
export default function SearchForm({ onClose }: SearchFormProps) {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!keyword.trim()) return

    router.push(`/search?q=${encodeURIComponent(keyword)}`)

    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          name="name"
          value={keyword}
          className="w-full rounded-xl border-2 pl-4"
          placeholder="제품명을 입력해주세요"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          type="submit"
          className="flex h-12 w-12 items-center justify-center disabled:opacity-50"
        >
        <Search />
        </button>
      </form>
    </>
  )
}