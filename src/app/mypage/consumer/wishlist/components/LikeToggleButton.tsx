"use client";

import { useRef, useState } from "react";
import { Heart } from "lucide-react";

interface Props {
  id: string;
  onRemove?: (id: string) => void;
}

export default function LikeToggleButton({ id, onRemove }: Props) {
  const [isLike, setIsLike] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleLike = () => {
    const nextLikeStatus = !isLike;

    setIsLike(nextLikeStatus);
    setShowToast(true);

    // 추가, 해체를 연속으로 하게 되는 경우, 기존에는 useEffect를 사용하여,
    // 토스트 메시지가 기존의 타이머 값에 의해 빠르게 사라짐
    // 따라서 이를 해결하기 위해 useRef를 사용하여, 타이머 값을 기억하고
    // 클릭할 때마다 기존 타이머를 clearTimeout으로 제거한 뒤
    // 새로운 타이머를 설정하여 항상 마지막 액션 기준으로 1.5초 동안 유지되도록 처리
    // 새로운 타이머 실행되었을 시, 좋아요 해제상태라면 해당 아이템 카드 제거하기

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setShowToast(false);
      if (nextLikeStatus === false) {
        onRemove?.(id);
      }
    }, 1500);
  };

  return (
    // 버튼 누르면 찜한 상품에 추가되었다는 문구, 삭제가 되면 삭제되었다는 문구
    <>
      <button
        onClick={handleLike}
        aria-label={isLike ? "좋아요 해제" : "좋아요 추가"}
      >
        {isLike ? (
          <Heart className="w-10 h-10 p-2 fill-red-500 text-red-500 transition-transform duration-200 hover:scale-130 " />
        ) : (
          <Heart className="w-10 h-10 p-2 hover:fill-pink-200" />
        )}
      </button>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg text-sm ">
            {isLike
              ? "찜한 상품을 추가하였습니다."
              : "찜한 상품을 해제하였습니다."}
          </div>
        </div>
      )}
    </>
  );
}
