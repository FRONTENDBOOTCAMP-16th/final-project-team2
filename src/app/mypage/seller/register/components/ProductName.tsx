type Props = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export default function ProductName({ value, error, onChange, onBlur }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="productName" className="text-sm">
        상품명
      </label>
      <input
        id="productName"
        name="productName"
        type="text"
        className="w-2xl h-12.5 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3"
        placeholder="예) 빈티지 라벨 스티커"
        aria-describedby="productNameHelp"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      <p id="productNameHelp" className="sr-only">
        상품명을 입력하세요
      </p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
