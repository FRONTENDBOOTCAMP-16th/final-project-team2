/* 
import { redirect } from 'next/navigation'
import { getUserRole } from '@/lib/auth' // 인증된 사용자 역할 가져오기 함수 (예시)

export default async function MyPage() {
	const role = await getUserRole() // 'consumer' | 'seller'
	
	if (role === 'seller') redirect('/mypage/seller')
	else redirect('/mypage/consumer')
}
  야무쌤이 참고하라고 제공해주신 코드 - 추후에 반영할 예정 : 사용자에 따라 리다이렉션해주는 코드 */
export default function MyPage() {
  return <div>마이페이지 영역</div>;
}
