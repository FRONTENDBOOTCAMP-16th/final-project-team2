import Link from "next/link";
import { StatData, StatCardProps, UserData } from "../types/user";

const CONSUMER_PATH = "/mypage/consumer";

const STATS_CONFIG: StatData[] = [
  { label: "총 주문", key: "orders", href: `${CONSUMER_PATH}/orders` },
  { label: "작성한 리뷰", key: "reviews", href: `${CONSUMER_PATH}/reviews` },
  { label: "쿠폰", key: "coupons", href: `${CONSUMER_PATH}/coupons` },
];

const StatCard = ({ label, value, href }: StatCardProps) => (
  <Link
    href={href}
    className="flex flex-col items-center w-[308px] h-[190px] gap-6 justify-center bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
  >
    <span className="font-bold text-5xl">{value}</span>
    <span className="text-gray-600 text-base">{label}</span>
  </Link>
);

export default function SummaryMenu() {
  const userData: UserData = {
    orders: 10,
    reviews: 3,
    coupons: 4,
  };
  return (
    <div className="flex gap-8">
      {STATS_CONFIG.map((stat) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={userData[stat.key]}
          href={stat.href}
        />
      ))}
    </div>
  );
}
