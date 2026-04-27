import { Option } from "@/app/mypage/types/sellerOrderItems";

interface Props {
  options: Option[];
}

export default function OptionList({ options }: Props) {
  return (
    <div className="flex flex-col">
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            {option.type}: {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
