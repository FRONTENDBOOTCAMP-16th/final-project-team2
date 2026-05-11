import { ReactNode } from 'react';

type ReviewListProps = {
  children: ReactNode;
};

export default function ReviewList({ children }: ReviewListProps) {
  return <>{children}</>;
}
