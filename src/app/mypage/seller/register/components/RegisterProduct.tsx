import OptionInput from "./OptionInput";
import ProductName from "./ProductName";
import ProductImg from "./ProductImg";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import ProductInventory from "./ProductInventory";
import ProductDiscount from "./ProductDiscount";
import SubmitButton from "./SubmitButton";

//  각 input에 관한 검증은 zods와 서버 액션을 사용하여 검증하는 로직 만들어야 함

export default function RegisterProduct() {
  // 상품명, 가격, 이미지, 상품 상세 설명, 재고, 할인율

  // 폼 액션 필요함
  return (
    <form className="flex flex-col gap-6">
      {/* 저장 버튼 */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">상품 등록 페이지</h2>
        <SubmitButton />
      </div>
      <div className="flex flex-col gap-y-6 ">
        <ProductImg />
        <ProductName />
        <ProductPrice />
        <ProductDescription />
        <ProductInventory />
        <ProductDiscount />
        <OptionInput />
      </div>
    </form>
  );
}
