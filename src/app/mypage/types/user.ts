import { LucideIcon } from "lucide-react";
// 통계 카드 컴포넌트 Props 타입
export interface StatCardProps {
  label: string;
  value: number;
  href: string;
  icon: LucideIcon;
}

// 사용자 데이터 타입
export interface UserData {
  orders?: number;
  coupons?: number;
  reviews?: number;
  orderStatus?: number; // 판매자용 추가
  products?: number; // 판매자용 추가
}

export interface StatData {
  label: string;
  key: keyof UserData;
  href: string;
  icon: LucideIcon;
}
