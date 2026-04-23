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
}
export default function ProductsCard({ products }: ProductsProps) {
  return products.map(item => {
    const discountPrice = item.price * (1 - item.discount / 100);
    const label = `제품명 ${item.name} 원래가격은 ${item.price}원이고 할인 ${item.discount.toLocaleString()}퍼센트 할인 중이며
                               현재 가격은 ${discountPrice.toLocaleString()}원 입니다 `;

    return (
      <li key={item.id} aria-label={label}>
        <Link href={`/${item.name}`}>
          <Image src={item.image} alt={item.name} width={282} height={282} />
          <dl>
            <dt className="sr-only">제품 명</dt>
            <dd>{item.name}</dd>
            <dt className="sr-only">가격</dt>
            <dd>
              <del>{item.price.toLocaleString()}원</del>
            </dd>
            <dt className="sr-only">할인율</dt>
            <dd>{item.discount}%</dd>
            <dt className="sr-only">할인된 가격</dt>
            <dd>{discountPrice.toLocaleString()}원</dd>
          </dl>
        </Link>
      </li>
    );
  });
}
