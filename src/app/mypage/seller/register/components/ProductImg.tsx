import Image from 'next/image'

type Props = {
  error?: string
  preview: string | null
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileName: string
}

export default function ProductImg({
  error,
  preview,
  onChangeImg,
  fileName,
}: Props) {
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChangeImg(e)
  }

  return (
    <div className="flex flex-col gap-5">
      <p id="productImageLabel" className="text-xl">
        상품 이미지 업로드
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="file"
          id="productImage"
          name="productImage"
          aria-describedby="productImageLabel"
          accept="image/png, image/jpeg"
          className="sr-only"
          onChange={handleChangeImg}
        />
        {/* 이미지 미리보기 (사용자 피드백) */}
        {preview && (
          <Image
            src={preview}
            alt="상품 이미지 미리보기"
            width={300}
            height={300}
            className="self-center border-2 border-red-400 p-3"
          />
        )}

        <label
          htmlFor="productImage"
          tabIndex={0}
          className={`flex h-10 cursor-pointer items-center justify-center border p-4 font-bold hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${preview ? 'bg-black whitespace-nowrap text-white' : 'bg-white text-gray-600'}`}
        >
          {preview ? '이미지 선택 완료' : '이미지 선택'}
        </label>

        <span aria-live="polite" className="shrink-0 text-sm text-gray-500">
          {fileName || '선택된 파일 없음'}
        </span>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
