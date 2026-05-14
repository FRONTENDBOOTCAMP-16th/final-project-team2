"use client";

import { useState } from "react";
import { useDaumPostcodePopup, Address } from "react-daum-postcode";

export default function AddressInput() {
  const open = useDaumPostcodePopup();

  const [zipCode, setZipCode] = useState("");
  const [streetAdr, setStreetAdr] = useState("");
  const [detailAdr, setDetailAdr] = useState("");

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setZipCode(data.zonecode);
    setStreetAdr(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          className="mbs-1 rounded bg-[#F0F1F1] px-3 py-2.5 w-40 cursor-pointer dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
          id="zipCode"
          name="zipCode"
          placeholder="우편번호"
          value={zipCode}
          readOnly
          onClick={handleClick}
        />
        <button
          type="button"
          onClick={handleClick}
          className="mbs-1 rounded bg-gray-800 text-white px-4 py-2.5 text-sm hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
        >
          우편번호 찾기
        </button>
      </div>
      <div>
        <input
          type="text"
          className="mbs-1 rounded bg-[#F0F1F1] px-3 py-2.5 w-full cursor-pointer  dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
          id="streetAdr"
          name="streetAdr"
          placeholder="도로명 주소"
          value={streetAdr}
          readOnly
          onClick={handleClick}
        />
      </div>
      <div>
        <input
          type="text"
          className="mbs-1 rounded bg-white border border-gray-300 px-3 py-2.5 w-full focus:outline-none focus:border-gray-500  dark:bg-gray-500 dark:text-white dark:placeholder:text-white dark:focus-within:bg-gray-900"
          id="detailAdr"
          name="detailAdr"
          placeholder="상세 주소 입력"
          value={detailAdr}
          onChange={(e) => setDetailAdr(e.target.value)}
        />
      </div>
    </div>
  );
}
