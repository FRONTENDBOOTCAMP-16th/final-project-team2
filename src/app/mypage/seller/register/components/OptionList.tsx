import { Option, OptionType } from "@/app/lib/products";

interface Props {
  options: Option[];
  onRemove: (name: OptionType) => void;
}

export default function OptionList({ options, onRemove }: Props) {
  return (
    <div className="flex flex-col">
      <ul>
        {options.map((option) => (
          <li key={option.name} className="flex flex-row gap-4 mb-3 ">
            <span className="w-80 border-2 border-gray-400 self-center p-2">
              {option.name}: {option.values}
            </span>
            <button
              type="button"
              onClick={() => onRemove(option.name as OptionType)}
              className="text-sm text-white hover:scale-110 hover:text-base bg-red-500 px-4 py-2"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
