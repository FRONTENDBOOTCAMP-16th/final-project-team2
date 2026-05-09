interface TabItem {
  id: string;
  label: string;
}

interface TabFilterProps {
  items: readonly TabItem[] | TabItem[];
  selectedValue: string;
  onValueChange: (id: string) => void;
  separator?: string;
}

export default function TabFilter({
  items,
  selectedValue,
  onValueChange,
  separator = "|",
}: TabFilterProps) {
  return (
    <div className="flex items-center gap-3 text-md font-medium mb-12.5 h-9">
      {items.map((item, index) => {
        const isActive = selectedValue === item.id;
        return (
          <div key={item.id} className="flex items-center gap-3">
            <button
              onClick={() => onValueChange(item.id)}
              aria-selected={isActive}
              role="tab"
              className={`transition-all whitespace-nowrap ${
                isActive
                  ? "text-black font-bold underline underline-offset-8 decoration-2"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {item.label}
            </button>
            {index !== items.length - 1 && (
              <span className="font-light">{separator}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
