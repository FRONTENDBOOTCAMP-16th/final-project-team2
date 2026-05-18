import Link from 'next/link'
import BackButton from './components/BackButton'

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FFF8F3]">
      <div className="flex min-h-125 w-[90%] max-w-5xl flex-col items-center justify-center border border-[#e0d8d0] bg-white px-10 py-12 text-center">
        <p className="text-9xl leading-none font-bold tracking-[-4px] text-black">
          404
        </p>
        <div className="my-6 h-px w-10 bg-black" />
        <p className="mb-12 text-xl tracking-wide text-neutral-500">
          페이지를 찾을 수 없습니다.
        </p>
        <div className="flex gap-3">
          <BackButton />
          <Link
            href="/"
            className="border-[1.5px] border-black bg-black px-6 py-2.5 text-sm tracking-widest text-white transition-opacity hover:opacity-80"
          >
            메인으로
          </Link>
        </div>
      </div>
    </section>
  )
}
