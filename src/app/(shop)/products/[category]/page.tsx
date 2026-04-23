import Link from 'next/link';
import products from '@/data/dummyproducts.json';
import ProductsCard from '@/app/components/ProductsCard';
import ProductsCardList from '@/app/components/ProductsCardList';
const ProductListPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ul className="flex gap-1.5">
          <li>
            <Link href="/all">전체</Link>
          </li>
          <li>
            <Link href="/ballpen">볼펜</Link>
          </li>
          <li>
            <Link href="/fountainpen">만년필</Link>
          </li>
        </ul>

        <select name="filter" id="filter">
          <option value="lastProduct">최신순</option>
          <option value="popularProduct">인기순</option>
          <option value="highPriceProduct">가격 높은 순</option>
          <option value="lowPriceProduct">가격 낮은 순</option>
        </select>
      </div>

      <section>
        <ProductsCardList>
          <ProductsCard products={products} />
        </ProductsCardList>
        <div className="pagenation">
          <button>이전</button>
          <button>1</button>
          <button>2</button>
          <button>다음</button>
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
