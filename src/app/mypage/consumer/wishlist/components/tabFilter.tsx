interface TabItem {
  id: string
  label: string
}

interface TabFilterProps {
  items: readonly TabItem[] | TabItem[]
  selectedValue: string
  onValueChange: (id: string) => void
  separator?: string
}

export default function TabFilter({
  items,
  selectedValue,
  onValueChange,
  separator = '|',
}: TabFilterProps) {
  return (
    <ul
      role="tablist"
      aria-label="카테고리 필터"
      className="text-md flex h-9 items-center gap-3 font-medium"
    >
      {items.map((item, index) => {
        const isActive = selectedValue === item.id
        return (
          <li
            key={item.id}
            role="presentation"
            className="flex items-center gap-3"
          >
            <button
              onClick={() => onValueChange(item.id)}
              aria-selected={isActive}
              role="tab"
              className={`text-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'font-bold text-red-600 underline decoration-2 underline-offset-8'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {item.label}
            </button>
            {index !== items.length - 1 && (
              <span className="font-light">{separator}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
