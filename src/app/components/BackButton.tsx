'use client'

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="border-[1.5px] border-black bg-white px-6 py-2.5 text-sm tracking-widest text-black transition-colors hover:bg-neutral-100"
    >
      ← 뒤로가기
    </button>
  )
}
