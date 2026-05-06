type Props = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function ProductPrice({ value, error, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {/* 상품 가격 */}
      <label htmlFor="productPrice" className="text-sm">
        상품 가격
      </label>
      <input
        name="productPrice"
        id="productPrice"
        type="number"
        aria-describedby="productPriceHelp"
        value={value}
        className="w-2xl h-12.5 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{
          MozAppearance: "textfield",
        }}
        placeholder="예) 10000"
        onChange={(e) => onChange(e.target.value)}
      />
      <p id="productPriceHelp" className="sr-only">
        상품 가격을 숫자로만 표기해주세요.
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
