// 국제화를 처리하기 위한 표준 api
//  intl api를 사용한 이유
// tolocaleString의 경우 불러올 때 마다 매번 포매터를 생성합니다 하지만 intl api를 사용할 경우
// 포매터를 한번만 작성하고 재사용하기 때문에 성능 측면에서 더 좋습니다
// 간단한 경우 toLocaleString을 사용해도 좋지만 리뷰 날짜/ 할인률/ 가격/ 상품 금액 등 여러가지를 사용해야되기 때문에 사용했습니다
export function DateFormat(date: string) {
  const formatter = new Intl.DateTimeFormat('ko-KR');
  return formatter.format(new Date(date));
}

export function PriceFormat(price: number) {
  const formatter = new Intl.NumberFormat('ko-KR');
  return formatter.format(price);
}

export function DiscountRateFormat(discount_rate: number) {
  const formatter = new Intl.NumberFormat('ko-KR');
  return formatter.format(discount_rate);
}

export function DiscountPriceFormat(price: number, discount_rate: number) {
  //10의 자리에서 반올림
  const discount_price = Math.round((price * (1 - discount_rate / 100)) / 10) * 10;
  const formatter = new Intl.NumberFormat('ko-KR');
  return formatter.format(discount_price);
}
