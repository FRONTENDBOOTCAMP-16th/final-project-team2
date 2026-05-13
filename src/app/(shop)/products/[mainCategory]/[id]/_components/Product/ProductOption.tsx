import { getProductDetail } from '@/api/productDetailApi'
import { CircleQuestionMarkIcon } from 'lucide-react'
import Quantity from './Quantity'

type ProductOptionItem = {
  name: string
  values: string[]
}

type ProductOptionProps = {
  productId: string
}

const ProductOption = async ({ productId }: ProductOptionProps) => {
  const product = await getProductDetail(productId)

  if (!product) return null

  const options = Array.isArray(product.options)
    ? (product.options as ProductOptionItem[])
    : []

  const colorOption = options.find(option => option.name === 'color')
  const sizeOption = options.find(option => option.name === 'size')

  const colors = Array.isArray(colorOption?.values)
    ? colorOption.values
    : []

  const sizes = Array.isArray(sizeOption?.values)
    ? sizeOption.values
    : []

  return (
    <>
      {colors.length > 0 && (
        <div>
          <label htmlFor="color" className="text-[18px]">
            색상
          </label>

          <select
            className="mt-2 block w-full border py-3"
            name="color"
            id="color"
          >
            {colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {sizes.length > 0 && (
        <>
          <div className="mt-6 flex items-center">
            <label htmlFor="size" className="mt-1 text-[18px]">
              사이즈
            </label>

            <button type="button" className="ml-5 cursor-pointer">
              <CircleQuestionMarkIcon />
            </button>
          </div>
          <div className="mt-4">
            <select
              className="mt-2 block w-full border py-3"
              name="size"
              id="size"
              >
              {sizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className='mt-8'>
        <Quantity price={product.price} discount_rate={product.discount_rate}  maxCount={product.inventory} />
      </div>
    </>
  )
}

export default ProductOption