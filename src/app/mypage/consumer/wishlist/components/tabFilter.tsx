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
    <div className="text-md mb-12.5 flex h-9 items-center gap-3 font-medium">
      {items.map((item, index) => {
        const isActive = selectedValue === item.id
        return (
          <div key={item.id} className="flex items-center gap-3">
            <button
              onClick={() => onValueChange(item.id)}
              aria-selected={isActive}
              role="tab"
              className={`whitespace-nowrap transition-all ${
                isActive
                  ? 'font-bold text-black underline decoration-2 underline-offset-8'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.label}
            </button>
            {index !== items.length - 1 && (
              <span className="font-light">{separator}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
