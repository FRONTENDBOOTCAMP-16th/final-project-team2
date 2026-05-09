import { useEffect, useState } from 'react';

interface SimpleToastProps<T> {
  text?: string;
  delay?: number;
  trigger?: T; // 외부에서 Type 받아오기
}

export default function SimpleToast<T>({ text, delay = 3000, trigger }: SimpleToastProps<T>) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!text) return;

    // 토스트 표시
    setShowToast(true);

    // 일정 시간이 지나면 토스트 사라지게 설정
    const timerId = setTimeout(
      () => {
        setShowToast(false);
      },
      delay,
      trigger
    );

    // 클린업 함수: 연속적인 입력이 들어오면 이전 타이머는 계속 취소되고 마지막 타이머만 실행
    return () => {
      clearTimeout(timerId);
    };
  }, [text, trigger]);

  if (!showToast || !text) return null;

  return (
    <div className="fixed text-sm bottom-14 left-1/2 -translate-x-1/2 z-40 bg-gray-800 py-3 px-4 rounded-3xl text-white whitespace-nowrap">
      {text}
    </div>
  );
}
