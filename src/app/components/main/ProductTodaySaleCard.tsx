import { ReactNode } from 'react'

interface ProductTodaySaleCardProps {
  children: ReactNode
  title: string
  subTitle?: string
  fullImage?: boolean
}

export default function ProductTodaySaleCard({
  children,
  title,
  subTitle,
  fullImage = false,
}: ProductTodaySaleCardProps) {
  return (
    <>
      <div className="m-auto max-w-7xl px-4 py-22.5">
        <div className="text-center">
          <h2 className="font-4 text-5xl font-bold">{title}</h2>
          <p className="mbs-5 mb-12.5 text-[#7B7979]">{subTitle}</p>
        </div>
        {fullImage ? (
          <div className="[&_a>div]:w-full! [&_li>button]:right-0">
            {children}
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-6 lg:flex-row">
            {children}
          </div>
        )}
      </div>
    </>
  )
}
