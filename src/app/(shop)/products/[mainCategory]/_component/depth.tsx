import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

type DepthProps = {
  mainCategory: string;
};

const Depth = ({ mainCategory }: DepthProps) => {
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

        <li className="text-black font-medium">{categoryMap[mainCategory] ?? mainCategory}</li>
      </ol>
    </nav>
  );
};

export default Depth;
