import { getRecommendProducts } from '@/api/getProducts';
import { CategoryType, CATEGORY_TYPES } from '../lib/category';
import { Products } from '../lib/products';

type ProductProps = {
  originalDatas: Products[];
  condition: CategoryType;
};

type RecProps = {
  category: string;
  keyword: string;
};

type CategoryProps = {
  originalDatas: Products[];
  kindOf: string;
};

export function productFilter({ originalDatas, condition }: ProductProps): Products[] {
  if (!originalDatas) {
    throw new Error('데이터가 들어오지 않았습니다.');
  }

  if (!condition) {
    return originalDatas;
  }

  if (!CATEGORY_TYPES.includes(condition as CategoryType)) {
    throw new Error('조건에 들어가는 파라미터 값을 확인해주세요.');
  }

  //빠른 반환보다는 가독성을 위해 다음과 같이 작성했습니다.
  const filteredDatas = originalDatas.filter(item => item.category === condition);
  return filteredDatas;
}

// role 어떤
// 카테고리 필터링 필기구 내에있는 상세 필터링 기능입니다. name에 포함된 명칭(예시 : 만년필/볼펜) 을 통해 분리합니다.
export function CategoryFilter({ originalDatas, kindOf }: CategoryProps) {
  if (!originalDatas && !kindOf) throw new Error('파라미터를 확인해주세요');
  const filteredDatas = originalDatas.filter(item => item.name.includes(kindOf));
  return filteredDatas;
}

// 백엔드에서 처리
// 장바구니, 추천 상품,품절임박상품등을 가져오는
export function getProduct(originalDatas: Products[]) {
  return originalDatas;
}

export default async function RecommendProduct({ category, keyword }: RecProps) {
  const data = await getRecommendProducts({
    category,
    keyword,
  });

  return (
    <div>
      {data.products.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
// 품절임박 상품을 필터링합니다.
export function AlmostOutOfStock() {}
