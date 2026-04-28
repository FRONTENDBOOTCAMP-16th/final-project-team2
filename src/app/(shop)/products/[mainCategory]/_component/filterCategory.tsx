import Link from 'next/link';

interface Props {
  mainCategory: string;
}

const FilterCategory = ({ mainCategory }: Props) => {
  const linkState = {
    active: 'border-b-4 border-[#FF6B6B] font-bold',
  };

  return (
    <ul className="flex gap-1.5">
      <li>
        <Link href={`/products/${mainCategory}`} className={linkState.active}>
          전체
        </Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=ballpen`}>볼펜</Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=fountainpen`}>만년필</Link>
      </li>
      <div aria-hidden>/</div>
      <li>
        <Link href={`/products/${mainCategory}?category=note`}>노트</Link>
      </li>
    </ul>
  );
};

export default FilterCategory;
