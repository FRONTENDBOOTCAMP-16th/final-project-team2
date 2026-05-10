import { CATEGORY_GROUPS } from "@/app/mypage/consumer/wishlist/lib/categoryGroup";
import { CATEGORY_NAME_TO_ID } from "@/app/mypage/consumer/wishlist/lib/categoryNameToId";
import { ChevronDown } from "lucide-react";
import { ChangeEvent, useState } from "react";

type Props = {
  error?: string;
  onChange: (value: string) => void;
};

export default function CategorySelector({ error, onChange }: Props) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const currentGroup = CATEGORY_GROUPS.find(
    (group) => group.label === selectedGroup,
  );

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGroup(e.target.value);
    setSelectedCategory("");
    onChange("");
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedCategory(name);
    onChange(name);
  };
  return (
    <div className="flex gap-2">
      <div className=" flex gap-2 relative">
        <label htmlFor="categoryGroup" className="text-sm self-center">
          카테고리
        </label>
        {/* 대분류 */}
        <select
          id="categoryGroup"
          value={selectedGroup}
          onChange={handleGroupChange}
          className="appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">대분류 선택</option>
          {CATEGORY_GROUPS.map((g) => (
            <option key={g.id} value={g.label}>
              {g.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 w-4 h-4" />
      </div>

      {/* 소분류 */}
      {currentGroup && (
        <select
          name="productCategoryId"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">소분류 선택</option>
          {currentGroup.categories
            .filter((c) => c !== selectedGroup)
            .map((c) => (
              <option key={c} value={CATEGORY_NAME_TO_ID[c]}>
                {c}
              </option>
            ))}
        </select>
      )}
      {error && <p className="text-red-500 self-center">{error}</p>}
    </div>
  );
}
