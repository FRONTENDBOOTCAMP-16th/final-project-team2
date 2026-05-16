import { TotalPriceFormat } from '@/utils/intl'

type TotalPriceProps = {
  price: number
  discount_rate: number
  quantity: number
}

const TotalPrice = ({ price, discount_rate, quantity }: TotalPriceProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 dark:border-white dark:bg-[#25292D]">
      <p>총 상품 금액</p>
      <p className="text-2xl font-bold text-black dark:text-white">
        {TotalPriceFormat(price, discount_rate, quantity)}
        <span className="ml-2 dark:text-white">원</span>
      </p>
    </div>
  )
}

export default TotalPrice
