import { Heart } from 'lucide-react';
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
  hasLike?: boolean;
}

export default function ProductsCard({ products, maxProducts, hasLike = true }: ProductsProps) {
  return products.slice(0, maxProducts).map(item => {
    const discountPrice = Math.floor(item.price * (1 - item.discount / 100));

    const label = `제품명 ${item.name}, 원래 가격은 ${item.price.toLocaleString()}원이고 ${item.discount}퍼센트 할인 중이며 현재 가격은 ${discountPrice.toLocaleString()}원입니다.`;
    const isLike = false;
    return (
      <li key={item.id} className="relative" aria-label={label}>
        {hasLike && (
          <button
            className="absolute bottom-15 right-3 z-10 p-2 aspect-square text-xl bg-white hover:bg-pink-100 transition-colors duration-300"
            type="button"
            aria-label={`${item.name} 좋아요`}
          >
            <Heart className={isLike ? 'fill-red-500' : ''} />
          </button>
        )}

        <Link href={`/products/pen/${item.id}`} className="block">
          <Image src={item.image} alt={item.name} width={282} height={282} className="w-full h-auto" />

          <div>
            <dl>
              <dt className="sr-only">제품 타입</dt>
              <dd className="text-gray-700 mt-4">필기구</dd>

              <dt className="sr-only">제품 명</dt>
              <dd className="text-2xl font-medium mt-2">{item.name}</dd>
            </dl>

            <dl className="flex gap-3">
              <dt className="sr-only">할인율</dt>
              <dd className="text-orange-600 mt-2 font-bold text-2xl">{item.discount}%</dd>

              <dt className="sr-only">할인된 가격</dt>
              <dd className="text-2xl font-medium mt-2 ml-2">{discountPrice.toLocaleString()}원</dd>
            </dl>
          </div>
        </Link>
      </li>
    );
  });
}
