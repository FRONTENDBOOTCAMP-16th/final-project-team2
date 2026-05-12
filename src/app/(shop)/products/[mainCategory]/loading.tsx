'use client';

type LoadingProps = {
  text?: string;
  fullScreen?: boolean;
};

export default function Loading({ text = '잠시만 기다려 주세요', fullScreen = false }: LoadingProps) {
  return (
    <section aria-label="로딩 중" className={`flex flex-col items-center justify-center gap-5 ${fullScreen ? 'min-h-screen' : 'min-h-125'}`}>
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border border-gray-200" />

        <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-black border-t-transparent" />

        <div className="absolute h-2.5 w-2.5 rounded-full bg-black" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-medium tracking-wide text-gray-900">{text}</p>

        <span className="text-xs tracking-[0.2em] text-gray-400 uppercase">Loading</span>
      </div>
    </section>
  );
}
