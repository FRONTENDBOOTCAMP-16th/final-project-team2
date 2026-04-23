import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

interface ProductsProps {
  products: Product[];
  maxProducts: number;
}

/*
 * maxProduct는 페이지에 들어가는 최대 제품 갯수입니다
 */
export default function ProductsCard({ products, maxProducts }: ProductsProps) {
  return products.slice(0, maxProducts).map(item => {
    const discountPrice = item.price * (1 - item.discount / 100);
    const label = `제품명 ${item.name} 원래가격은 ${item.price}원이고 할인 ${item.discount}퍼센트 할인 중이며
                               현재 가격은 ${discountPrice.toLocaleString()}원 입니다 `;

    return (
      <li key={item.id} aria-label={label}>
        <Link href={`/products/pen/${item.id}`}>
          <Image src={item.image} alt={item.name} width={282} height={282} />
          <div className="flex justify-between items-start mt-5">
            <dl>
              <dt className="sr-only">제품 타입</dt>
              <dd className="text-gray-700">필기구</dd>
              <dt className="sr-only">제품 명</dt>
              <dd className="text-2xl font-medium mt-2">{item.name}</dd>
              <dt className="sr-only">가격</dt>
              <dd>
                <del>{item.price.toLocaleString()}원</del>
              </dd>
              <div className="flex gap-3">
                <dt className="sr-only">할인율</dt>
                <dd className="text-orange-600 font-bold text-2xl">{item.discount}%</dd>
                <dt className="sr-only">할인된 가격</dt>
                <dd className="text-2xl font-medium">{discountPrice.toLocaleString()}원</dd>
              </div>
            </dl>
            <button
              className="p-1 aspect-square text-2xl border-2 border-gray-500 rounded-full hover:bg-pink-100 transition-colors duration-300"
              type="button"
            >
              ❤️
            </button>
          </div>
        </Link>
      </li>
    );
  });
}
