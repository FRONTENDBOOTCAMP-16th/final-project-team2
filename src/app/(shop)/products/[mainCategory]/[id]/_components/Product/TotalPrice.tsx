import { PriceFormat } from '@/utils/supabase/intl'

type TotalPriceProps = {
  price: number
  quantity: number
}

const TotalPrice = ({ price, quantity }: TotalPriceProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4">
      <p>총 상품 금액</p>
      <p className="text-2xl font-bold text-[#FF6B6B]">
        {PriceFormat(price * quantity)}
      </p>
    </div>
  )
}

export default TotalPrice
