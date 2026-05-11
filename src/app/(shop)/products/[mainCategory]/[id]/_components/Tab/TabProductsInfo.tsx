import { ReactNode } from 'react';
import { Products } from '@/app/lib/products';

type Props = {
  product: Products;
  children: ReactNode;
};

export default function TabProductsInfo({ product, children }: Props) {
  const DETAIL_TABS = [
    { id: 'detail', label: '제품 상세' },
    { id: 'store', label: '가게 정보' },
  ] as const;

  return (
    <article className="mx-auto mt-16 max-w-7xl px-4">
      <header className="border-b border-gray-200">
        <nav aria-label="상품 상세 탭">
          <ul className="flex gap-6">
            {DETAIL_TABS.map(tab => (
              <li key={tab.id}>
                <button type="button" className="border-b-2 border-transparent text-2xl px-1 py-4 text-gray-700 hover:text-black">
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="py-8">
        <h2 className="text-2xl font-semibold">제품 상세</h2>
        {/* 돔 퓨리파이 사용해야 하는 부분 */}
        <div className="contents">{/* <p className="mt-4 text-xl text-justify max-w-6xl leading-8 text-gray-700">{product.content}</p> */}</div>
        {children}
      </section>
    </article>
  );
}
