import { OptionType, ProductOptionType } from '@/app/lib/products.types'

interface Props {
  options: ProductOptionType[]
  onRemove: (name: OptionType) => void
}

export default function OptionList({ options, onRemove }: Props) {
  const safeOptions = Array.isArray(options) ? options : []
  return (
    <div className="flex flex-col">
      <ul>
        {safeOptions.map((option) => (
          <li key={option.name} className="mb-3 flex flex-row gap-4">
            <span className="w-80 self-center border-2 border-gray-400 p-2">
              {option.name}: {option.values.join(', ')}
            </span>
            <button
              type="button"
              onClick={() => onRemove(option.name as OptionType)}
              className="bg-red-500 px-4 py-2 text-sm text-white hover:scale-110 hover:text-base"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
