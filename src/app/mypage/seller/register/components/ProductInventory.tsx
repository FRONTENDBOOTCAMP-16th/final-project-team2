type Props = {
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function ProductInventory({
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* 상품 재고 */}
      <label htmlFor="productInventory" className="text-sm">
        상품 재고
      </label>
      <input
        type="number"
        name="productInventory"
        id="productInventory"
        aria-describedby="productInventoryHelp"
        placeholder=" 최소 10개부터 최대 100개까지 설정 가능합니다."
        min="10"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="h-12.5 w-2xl border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
      />
      <p id="productInventoryHelp" className="sr-only">
        최소 10개부터 최대 100개까지 설정 가능합니다.
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
