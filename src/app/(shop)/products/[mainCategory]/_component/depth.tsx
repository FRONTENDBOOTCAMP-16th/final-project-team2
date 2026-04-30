import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

type DepthProps = {
  mainCategory: string;
  productName?: string;
};

const Depth = ({ mainCategory, productName }: DepthProps) => {
  const categoryMap: Record<string, string> = {
    stationery: '필기구',
    notebook: '노트',
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link aria-label="홈으로 이동하기" href="/" className="hover:text-black">
            <HomeIcon className="w-4 h-4" />
          </Link>
        </li>

        <ChevronRight className="w-4 h-4" />
        {productName ? (
          <>
            <li className="text-black font-medium">
              <Link href={`/products/${mainCategory}`} aria-label={`${categoryMap[mainCategory]}로 이동하기`} className="hover:text-black">
                {categoryMap[mainCategory] ?? mainCategory}
              </Link>
            </li>

            <ChevronRight className="w-4 h-4" />
            <li className="text-black font-medium">{productName}</li>
          </>
        ) : (
          <>
            <li className="text-black font-medium">{categoryMap[mainCategory] ?? mainCategory}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Depth;
