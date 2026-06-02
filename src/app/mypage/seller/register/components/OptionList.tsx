import { OptionType, ProductOptionType } from '@/app/lib/products.types'

interface Props {
  options: ProductOptionType[]
  onRemove: (name: OptionType) => void
}

export default function OptionList({ options, onRemove }: Props) {
  const safeOptions = Array.isArray(options) ? options : []
  return (
    <div className="flex flex-1 flex-col">
      <ul>
        {safeOptions.map((option) => (
          <li key={option.name} className="mb-3 flex flex-row gap-4">
            <span className="w-full border-2 border-gray-400 p-2">
              {option.name}: {option.values.join(', ')}
            </span>
            <button
              type="button"
              onClick={() => onRemove(option.name as OptionType)}
              className="shrink-0 bg-red-500 px-9 py-3 text-sm whitespace-nowrap text-white hover:bg-gray-300"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
