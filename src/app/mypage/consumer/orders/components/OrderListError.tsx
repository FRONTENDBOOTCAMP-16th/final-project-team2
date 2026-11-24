interface Props {
  onRetry: () => void
}

export default function OrderListError({ onRetry }: Props) {
  return (
    <div role="alert" className="py-32 text-center">
      <p>주문 내역을 불러오지 못했습니다.</p>
      <button
        type="button"
        onClick={() => onRetry()}
        className="mt-2 rounded-lg border border-red-500 px-2 hover:bg-red-300"
      >
        다시 시도
      </button>
    </div>
  )
}
