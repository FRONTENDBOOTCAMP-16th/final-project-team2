import { PropsWithChildren, ReactNode } from 'react';

interface MainCardProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
  fullImage?: boolean;
}

export default function MainCard({ children, title, subTitle, fullImage = false }: MainCardProps) {
  return (
    <>
      <div className="py-22.5 px-4 max-w-7xl m-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold font-4">{title}</h2>
          <p className="text-[#7B7979] mbs-5 mb-12.5">{subTitle}</p>
        </div>
        {fullImage ? (
          <div className="[&_a>div]:w-full! [&_li>button]:right-0">{children}</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">{children}</div>
        )}
      </div>
    </>
  );
}
