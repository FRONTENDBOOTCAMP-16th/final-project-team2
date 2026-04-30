import Link from 'next/link';

interface Props {
  mainCategory: string;
  sort?: string;
}

const FilterCategory = ({ mainCategory, sort }: Props) => {
  const linkState = {
    active: 'border-b-4 border-[#FF6B6B] font-bold',
  };

  return (
    <ul className="flex gap-1.5">
      <li>
        <Link href={`/products/${mainCategory}?sort=${sort}&page=1`} className={linkState.active}>
          전체
        </Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=ballpen&sort=${sort}&page=1`}>볼펜</Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=fountainpen&sort=${sort}&page=1`}>만년필</Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=note&sort=${sort}&page=1`}>노트</Link>
      </li>
    </ul>
  );
};

export default FilterCategory;
