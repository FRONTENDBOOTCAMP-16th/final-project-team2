// 국제화를 처리하기 위한 표준 api
//  intl api를 사용한 이유
// tolocaleString의 경우 불러올 때 마다 매번 포매터를 생성합니다 하지만 intl api를 사용할 경우
// 포매터를 한번만 작성하고 재사용하기 때문에 성능 측면에서 더 좋습니다
// 간단한 경우 toLocaleString을 사용해도 좋지만 리뷰 날짜/ 할인률/ 가격/ 상품 금액 등 여러가지를 사용해야되기 때문에 사용했습니다
const priceFormatter = new Intl.NumberFormat('ko-KR');
const dateFormatter = new Intl.DateTimeFormat('ko-KR');

export function DateFormat(date: string) {
  return dateFormatter.format(new Date(date));
}

export function PriceFormat(price: number) {
  return priceFormatter.format(price);
}

export function DiscountRateFormat(discount_rate: number) {
  return priceFormatter.format(discount_rate);
}

export function DiscountPrice(price: number, discount_rate: number) {
  return Math.round((price * (1 - discount_rate / 100)) / 10) * 10;
}

export function DiscountPriceFormat(price: number, discount_rate: number) {
  return priceFormatter.format(DiscountPrice(price, discount_rate));
}

export function TotalPriceFormat(price: number, discount_rate: number, quantity: number) {
  return priceFormatter.format(DiscountPrice(price, discount_rate) * quantity);
}