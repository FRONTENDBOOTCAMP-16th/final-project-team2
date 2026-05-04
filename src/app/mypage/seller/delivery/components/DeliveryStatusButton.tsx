export default function DeliverStatusButton() {
  //  추후에 관리 버튼을 누르면 배송 준비중 | 배송 중 | 배송 완료 같은 상태를 제어할 수 있는 기능 구현
  // 이 기능은 소비자 마이페이지 나의 주문 내역의 배송 상태와 연결이 되어야 됨
  return (
    <button className="font-semibold border border-gray-300 rounded-md px-4 py-1 hover:bg-gray-300 hover:text-white">
      관리
    </button>
  );
}
