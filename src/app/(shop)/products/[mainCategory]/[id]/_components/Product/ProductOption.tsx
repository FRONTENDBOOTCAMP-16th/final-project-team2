import { CircleQuestionMarkIcon } from 'lucide-react'

const ProductOption = () => {
  return (
    <>
      <div>
        <label htmlFor="color" className="text-[18px]">
          색상
        </label>
        <select
          className="mt-2 block w-full border py-3"
          name="color"
          id="color"
        >
          <option value="black">검정</option>
          <option value="red">빨강</option>
          <option value="blue">파랑</option>
        </select>
      </div>

      <div className="mt-6 flex items-center">
        <label htmlFor="size" className="mt-1 text-[18px]">
          사이즈
        </label>
        <button type="button" className="ml-5 cursor-pointer">
          <CircleQuestionMarkIcon />
        </button>
      </div>
      <select className="mt-2 block w-full border py-3" name="size" id="size">
        <option value="small">small</option>
        <option value="medium">medium</option>
        <option value="large">large</option>
      </select>
    </>
  )
}

export default ProductOption
