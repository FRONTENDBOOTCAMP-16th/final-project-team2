type Props = {
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export default function ProductDescription({ value, error, onChange }: Props) {
  //  작성할 때마다 밑에 오류 메시지가 깜빡 깜빡 되는 부분을 리펙토링 과정 필요

  return (
    <div className="flex flex-col gap-2 ">
      {/* 상품 정보 */}
      <label htmlFor="productDescription" className="text-sm">
        상품 정보
      </label>
      <div className="w-2xl relative">
        <textarea
          name="productDescription"
          value={value}
          id="productDescription"
          className="w-full h-50 border border-[#D1D5DC] bg-[#F9FAFB] px-4 py-3 "
          onChange={(e) => onChange(e.target.value)}
          maxLength={500}
          placeholder="예) 정밀하게 지울 수 있는 펜형 지우개"
        />
        <p className="text-sm text-gray-500 absolute bottom-2 right-3">
          {value.length} / 500
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
