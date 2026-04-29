import { PropsWithChildren, ReactNode } from 'react';

interface MainCardListProps {
  children: ReactNode
  className?: string
}


const MainCardList = ({ children, className }: MainCardListProps) => {
  return <div className={className}>{children}</div>
}

export default MainCardList
