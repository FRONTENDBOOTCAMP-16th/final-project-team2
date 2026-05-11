import { PriceFormat } from '../../../../../../../../utils/supabase/intl';

type TotalPriceProps = {
  price: number;
  quantity: number;
};

const TotalPrice = ({ price, quantity }: TotalPriceProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <p>총 상품 금액</p>
      <p className="text-[#FF6B6B] text-2xl font-bold">{PriceFormat(price * quantity)}</p>
    </div>
  );
};

export default TotalPrice;
