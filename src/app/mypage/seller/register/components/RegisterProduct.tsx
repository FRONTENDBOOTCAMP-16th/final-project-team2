import { Pen } from "lucide-react";
import OptionInput from "./OptionInput";

export default function RegisterProduct() {
  // 상품명, 가격, 이미지, 상품 상세 설명, 재고, 할인율

  return (
    <section>
      <form className="flex flex-col">
        <button type="submit" className="flex flex-row self-end border p-2">
          <Pen />
          상품 등록
        </button>
        {/* 상품명 */}
        <label htmlFor="productName">상품명</label>
        <input id="productName" name="productName" type="text" />
        {/* 상품 이미지 */}
        <label htmlFor="productImage">상품 이미지</label>
        <input type="file" name="productImage" id="productImage" />

        {/* 상품 가격 */}
        <label htmlFor="productPrice">상품 가격</label>
        <input id="productPrice" type="number" name="productPrice" />

        {/* 상품 정보 */}
        <label htmlFor="productdescription">상품 정보</label>
        <textarea name="productDescription" id="productDescription" />

        {/* 상품 재고 */}
        <label htmlFor="productInventory">상품 재고</label>
        <input type="number" name="productInventory" id="productInventory" />
        {/* 상품 할인율*/}
        <label htmlFor="productDiscount">상품 할인율</label>
        <input type="number" name="productDiscount" id="productDiscount" />
        <OptionInput />
      </form>
    </section>
  );
}
