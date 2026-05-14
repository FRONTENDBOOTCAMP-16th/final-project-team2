'use client'

import { useState } from 'react'
import AddressInput from './AddressInput'
import type { UserInfo } from '@/types/orders'


export default function AddressSection({ userInfo }: { userInfo: UserInfo }) {
  const [mode, setMode] = useState<'saved' | 'manual'>(userInfo ? 'saved' : 'manual')

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="font-bold mb-6 text-2xl">주문자 정보</legend>

        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('saved')}
            disabled={!userInfo}
            className={`px-4 py-2 rounded-t-lg border-b-2 transition-all ${mode === 'saved' ? 'border-black font-bold text-black dark:text-white dark:border-gray-300' : 'border-transparent text-gray-400   dark:text-gray-500'
              }`}
          >
            저장된 배송지
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`px-4 py-2 rounded-t-lg border-b-2 transition-all ${mode === 'manual' ? 'border-black font-bold text-black dark:text-white dark:border-gray-300' : 'border-transparent text-gray-400   dark:text-gray-500'
              }`}
          >
            직접 입력
          </button>
        </div>

        <div className="flex gap-8">
          {/* 이름, 연락처 영역 생략 (기존과 동일) */}
          <div className="flex flex-col w-full max-w-[320px]">
            <label htmlFor="userName" className="font-semibold text-sm">주문자 이름 *</label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              key={`name-${mode}`}
              defaultValue={mode === 'saved' ? userInfo?.name : ''}
              className="mt-1 rounded border border-gray-300 bg-white px-3 py-2.5 focus:outline-none focus:border-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-white dark:focus-within:bg-gray-900"
              readOnly={mode === 'saved' ? true : false}
            />
          </div>
          <div className="flex flex-col w-full max-w-[320px]">
            <label htmlFor="phone" className="font-semibold text-sm">연락처 *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              key={`phone-${mode}`}
              defaultValue={mode === 'saved' ? userInfo?.phone : ''}
              className="mt-1 rounded border border-gray-300 bg-white px-3 py-2.5 focus:outline-none focus:border-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-white dark:focus-within:bg-gray-900"
              readOnly={mode === 'saved' ? true : false}
            />
          </div>
        </div>
      </fieldset>

      <div className="mt-2">
        {mode === 'saved' ? (
          <div className="">
            <input type='hidden' name='zipCode' />
            <input type='hidden' name='detailAdr' />
            <input type='text' name='streetAdr' className="mt-1 rounded border border-gray-300 bg-white px-3 py-2.5 focus:outline-none focus:border-gray-500 w-full dark:bg-gray-500 dark:text-white dark:placeholder:text-white dark:focus-within:bg-gray-900" value={userInfo?.address} readOnly />
          </div>

        ) : (
          <AddressInput
            key={`address-${mode}`}
          />
        )}

      </div>
    </div>
  )
}