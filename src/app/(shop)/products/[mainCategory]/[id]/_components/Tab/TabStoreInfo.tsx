import Image from 'next/image'
import { MapPin, StoreIcon, User } from 'lucide-react'
import { Store } from '@/app/lib/stores'

type Props = {
  store: Store
  seller: string
}

export default function TabStoreInfo({ store, seller }: Props) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-2xl font-semibold">가게 정보</h2>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
          {store.profile_image ? (
            <Image
              src={store.profile_image}
              alt={`${store.name} 프로필 이미지`}
              fill
              className="object-cover"
            />
          ) : (
            <StoreIcon className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>

        <div className="flex-1">
          <strong className="text-xl font-bold">{store.name}</strong>

          <p className="mt-3 leading-7 text-gray-600">
            {store.intro || '등록된 가게 소개가 없습니다.'}
          </p>

          <dl className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />

              <dt className="sr-only">판매자</dt>

              <dd>{seller ?? '판매자 정보 없음'}</dd>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />

              <dt className="sr-only">위치</dt>

              <dd>{store.location || '위치 정보 없음'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
