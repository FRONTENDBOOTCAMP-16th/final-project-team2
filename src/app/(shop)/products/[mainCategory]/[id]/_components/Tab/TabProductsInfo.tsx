'use client';

import { ReactNode, useState } from 'react';
import { Products } from '@/app/lib/products';
import { Sanitize } from '@/utils/sanitize';

type Props = {
  product: Products;
  productContent: ReactNode;
  storeContent: ReactNode;
  reviewContent: ReactNode;
};

type TabType = 'detail' | 'store' | 'review';

const DETAIL_TABS = [
  { id: 'detail', label: '제품 상세' },
  { id: 'store', label: '가게 정보' },
  { id: 'review', label: '리뷰' },
] as const;

export default function TabProductsInfo({ product, productContent, storeContent, reviewContent }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('detail');

  return (
    <article className="mx-auto mt-16 max-w-7xl px-4">
      <header className="sticky top-17 z-30 border-b border-gray-200 bg-white">
        <nav aria-label="상품 상세 탭">
          <div role="tablist" className="flex items-center gap-8 overflow-x-auto">
            {DETAIL_TABS.map(tab => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`${tab.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative py-5 text-lg font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive ? 'text-[#FF6B6B]' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {tab.label}

                  <span
                    className={`absolute bottom-0 left-0 h-1 w-full rounded-full transition-all duration-200 ${
                      isActive ? 'bg-[#FF6B6B]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <section id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`} aria-live="polite" className="py-10">
        {activeTab === 'detail' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold">제품 상세</h2>

            <div
              className="mt-6 max-w-6xl text-justify text-lg leading-9 text-gray-700"
              dangerouslySetInnerHTML={{
                __html: Sanitize(product.content),
              }}
            />

            <div className="mt-10">{productContent}</div>
          </div>
        )}
        {activeTab === 'store' && <div className="animate-in fade-in duration-300">{storeContent}</div>}
        {activeTab === 'review' && <div className="animate-in fade-in duration-300">{reviewContent}</div>}
      </section>
    </article>
  )
}
