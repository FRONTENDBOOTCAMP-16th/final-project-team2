"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LikeToggleButton() {
  const [isLike, setIsLike] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleLike = () => {
    const nextLikeStatus = !isLike;
    setIsLike(nextLikeStatus);

    //추가/해체 모두 다 토스트 보여줘야함
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    // 버튼 누르면 찜한 상품에 추가되었다는 문구, 삭제가 되면 삭제되었다는 문구
    <>
      <button onClick={handleLike}>
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
