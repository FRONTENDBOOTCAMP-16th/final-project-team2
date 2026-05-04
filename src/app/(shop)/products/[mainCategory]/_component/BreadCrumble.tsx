import { ChevronRight, HomeIcon } from 'lucide-react';
import Link from 'next/link';

type DepthProps = {
  categoryMap: string;
};

const BreadCrumble = ({ categoryMap }: DepthProps) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        <li>
          <Link aria-label="홈으로 이동하기" href="/" className="hover:text-black">
            <HomeIcon className="w-4 h-4" />
          </Link>
        </li>
        <ChevronRight className="w-4 h-4" />
        <li className="text-black font-medium text-lg">{categoryMap}</li>
      </ol>
    </nav>
  );
};

export default BreadCrumble;
