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
      className="flex h-9 min-w-0 flex-1 items-center gap-2 md:gap-3"
    >
      {items.map((item, index) => {
        const isActive = selectedValue === item.id
        return (
          <li
            key={item.id}
            role="presentation"
            className="flex flex-row items-center gap-2"
          >
            <button
              onClick={() => onValueChange(item.id)}
              aria-selected={isActive}
              role="tab"
              className={`text-sm whitespace-nowrap transition-all md:text-lg ${
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
