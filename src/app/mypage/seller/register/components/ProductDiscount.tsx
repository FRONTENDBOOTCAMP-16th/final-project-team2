type Props = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function ProductDiscount({
  value,
  error,
  onChange,
  onBlur,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="productDiscount" className="text-sm">
        상품 할인율
      </label>
      <input
        type="number"
        name="productDiscount"
        id="productDiscount"
        aria-describedby="prouductDiscountHelp"
        step="5"
        max="70"
        min="0"
        value={value}
        className="w-2xl h-12.5 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
        placeholder="최소 0%부터 최대 70%까지 설정 가능합니다."
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      <p id="prouductDiscountHelp" className="sr-only">
        최소 0%부터 최대 70%까지 설정 가능합니다.
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
