import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
import Pagination from '@/app/components/Pagination';
import { ChevronRight, Home } from 'lucide-react';

type ProductPageProps = {
  params: Promise<{
    mainCategory: string;
  }>;
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: string;
  }>;
};

const categoryMap: Record<string, string> = {
  stationery: '필기구',
  notebook: '노트',
};

export default async function ProductListPage({ params, searchParams }: ProductPageProps) {
  const { mainCategory } = await params;
  const { category, page, sort } = await searchParams;

  const filtered = category ? products.filter(product => product.category === category) : products;

  const PAGE_SIZE = 16;
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  const mainCategoryName = categoryMap[mainCategory] ?? mainCategory;

  return (
    <main className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav aria-label="breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-black">
              <Home />
            </Link>
          </li>

          <li aria-hidden="true">
            <ChevronRight className="w-4 h-4" />
          </li>

          <li className="text-black font-extrabold" aria-current="page">
            {mainCategoryName}
          </li>
        </ol>
      </nav>

      <div className="text-center">
        <h1 className="text-[48px] font-bold mb-5">{mainCategoryName}</h1>
        <p className="font-semibold text-[#7B7979]">장인은 도구탓을 합니다</p>
      </div>

      <div className="flex justify-between mb-16 mt-18">
        <ul className="flex gap-1.5">
          <li>
            <Link href={`/products/${mainCategory}`} className={!category ? 'border-b-4 border-[#FF6B6B] font-bold' : ''}>
              전체
            </Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link href={`/products/${mainCategory}?category=ballpen`}>볼펜</Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link href={`/products/${mainCategory}?category=fountainpen`}>만년필</Link>
          </li>

          <li aria-hidden="true">/</li>

          <li>
            <Link href={`/products/${mainCategory}?category=note`}>노트</Link>
          </li>
        </ul>

        <label htmlFor="sort" className="sr-only">
          정렬
        </label>

        <select name="sort" id="sort" className="border" defaultValue={sort ?? 'lastProduct'}>
          <option value="lastProduct">최신순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>

      <section aria-labelledby="productList">
        <h2 className="sr-only" id="productList">
          상품 둘러보기
        </h2>

        <ProductsCardList>
          <ProductsCard maxProducts={12} products={paginated} />
        </ProductsCardList>
      </section>

      <Pagination searchParams={searchParams} />
    </main>
  );
}
