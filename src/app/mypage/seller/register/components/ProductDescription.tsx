type Props = {
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function ProductDescription({
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="productDescription" className="text-sm">
        상품 정보
      </label>
      <div className="relative w-2xl">
        <textarea
          name="productDescription"
          value={value}
          id="productDescription"
          className="h-50 w-full border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          maxLength={500}
          placeholder="예) 정밀하게 지울 수 있는 펜형 지우개"
        />
        <p className="absolute right-3 bottom-2 text-sm text-gray-500">
          {value.length} / 500
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
