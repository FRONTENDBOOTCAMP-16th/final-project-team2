export default function ProductInventory() {
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
        aria-labelledby="productInventoryHelp"
        placeholder=" 최소 10개부터 최대 100개까지 설정 가능합니다."
        min="10"
        max="100"
        className="w-2xl h-12.5 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
      />
      <p id="productInventoryHelp" className="sr-only">
        최소 10개부터 최대 100개까지 설정 가능합니다.
      </p>
    </div>
  );
}
