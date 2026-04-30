interface TabItem {
  id: string;
  label: string;
}

interface TabFilterProps {
  items: readonly TabItem[] | TabItem[]; // 수정 가능한 배열 또는 수정 불가능한 배열이 올 수 있음
  selectedValue: string;
  onValueChange: (id: string) => void;
  separator?: string;
}

// searchParams를 이용하여 탭 항목을 가져오는 형식으로 구현해야 되기때문에,
// 추후 수정 필요
export default function TabFilter({
  items,
  selectedValue,
  onValueChange,
  separator = "|",
}: TabFilterProps) {
  return (
    <div className="flex items-center gap-3 text-md font-medium mb-12.5 h-9">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-3">
          <button
            onClick={() => onValueChange(item.id)}
            className={`transition-all whitespace-nowrap ${
              selectedValue === item.id
                ? "text-black font-bold underline underline-offset-8 decoration-2"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {item.label}
          </button>
          {/* 리스트의 마지막이 아닐 때만 구분자 표시 */}
          {index !== items.length - 1 && (
            <span className=" font-light">{separator}</span>
          )}
        </div>
      ))}
    </div>
  );
}
