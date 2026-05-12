import { TotalPriceFormat } from '@/utils/intl';

type TotalPriceProps = {
  price: number;
  discount_rate: number;
  quantity: number;
};

const TotalPrice = ({ price, discount_rate, quantity }: TotalPriceProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4">
      <p>총 상품 금액</p>
      <p className="text-[#FF6B6B] text-2xl font-bold">{TotalPriceFormat(price, discount_rate, quantity)}</p>
    </div>
  )
}

export default TotalPrice
