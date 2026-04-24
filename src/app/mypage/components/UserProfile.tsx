import Link from "next/link";
import { UserData, StatCardProps, StatData } from "../types/user";

const CONSUMER_PATH = "/mypage/consumer";

const STATS_CONFIG: StatData[] = [
  { label: "총 주문", key: "orders", href: `${CONSUMER_PATH}/orders` },
  { label: "작성한 리뷰", key: "reviews", href: `${CONSUMER_PATH}/reviews` },
  { label: "쿠폰", key: "coupons", href: `${CONSUMER_PATH}/coupons` },
];

const GradeTooltip = () => (
  <div className="group relative flex items-center">
    <div className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[10px] flex items-center justify-center cursor-help">
      ?
    </div>
    <div className="absolute left-7 w-64 p-3 bg-white border border-gray-200 shadow-md hidden group-hover:block z-10 text-xs text-gray-700">
      <p className="font-bold mb-2 pb-1 border-b border-gray-100">
        등급 산정 조건
      </p>
      <ul className="space-y-1">
        <li>
          • <span className="font-semibold text-orange-900">BRONZE</span>: 0 ~
          50,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-gray-500">SILVER</span>: 50,000
          ~ 100,000원 미만
        </li>
        <li>
          • <span className="font-semibold text-yellow-500">GOLD</span>:
          100,000원 이상
        </li>
      </ul>
    </div>
  </div>
);

const StatCard = ({ label, value, href }: StatCardProps) => (
  <Link
    href={href}
    className="flex flex-col items-center w-72 h-32 justify-center bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
  >
    <span className="text-gray-600 text-xl mb-4">{label}</span>
    <span className="font-bold text-xl">{value}</span>
  </Link>
);

export default function UserProfile() {
  // 실제 데이터 (추후 API 연동)
  const userData: UserData = {
    orders: 10,
    reviews: 3,
    coupons: 4,
  };

  const userGrade = "BRONZE";

  return (
    <div className="p-4">
      <div className="flex items-center gap-6 mb-5">
        <div className="w-32 h-32 bg-gray-200 rounded-full shrink-0" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-black text-white inline-block px-2 py-0.5 text-sm font-bold">
              {userGrade}
            </div>
            <GradeTooltip />
          </div>
          <h2 className="text-3xl">user님, 반갑습니다.</h2>
        </div>
      </div>

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
    </div>
  );
}
