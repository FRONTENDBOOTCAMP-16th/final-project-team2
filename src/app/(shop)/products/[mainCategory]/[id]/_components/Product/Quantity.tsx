import { Minus, Plus } from 'lucide-react'

const Quantity = () => {
  return (
    <div className="inline-block">
      <label htmlFor="quantity" className="text-[18px] text-gray-700">
        수량
      </label>

      <div className="mt-4 flex items-center gap-1">
        <button
          type="button"
          aria-label="한개 제거"
          className="cursor-not-allowed border px-2.5 py-2 text-gray-600"
          disabled
        >
          <Minus className="w-4" />
        </button>

        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          value={1}
          readOnly
          className="w-20 appearance-none border py-2 text-center outline-none"
        />

        <button
          type="button"
          aria-label="한개 추가"
          className="cursor-pointer border bg-white px-2.5 py-2 text-black"
        >
          <Plus className="w-4" />
        </button>
      </div>
    </div>
  )
}

export default Quantity
