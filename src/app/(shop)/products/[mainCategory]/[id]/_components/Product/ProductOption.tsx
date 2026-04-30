import { CircleQuestionMarkIcon } from 'lucide-react';

const ProductOption = () => {
  return (
    <>
      <div>
        <label htmlFor="color" className="text-[18px]">
          색상
        </label>
        <select className="block border w-full py-3 mt-2" name="color" id="color">
          <option value="black">검정</option>
          <option value="red">빨강</option>
          <option value="blue">파랑</option>
        </select>
      </div>

      <div className="flex items-center mt-6">
        <label htmlFor="size" className="text-[18px] mt-1">
          사이즈
        </label>
        <button type="button" className="ml-5 cursor-pointer">
          <CircleQuestionMarkIcon />
        </button>
      </div>
      <select className="block border w-full py-3 mt-2" name="size" id="size">
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>
    </>
  );
};

export default ProductOption;
