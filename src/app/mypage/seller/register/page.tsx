import RegisterProduct from "./components/RegisterProduct";

export default function SellerRegisterProductPage() {
  return (
    <section className="flex flex-col gap-4 p-6  m-auto mt-10 w-full lg:w-243 bg-white">
      <h2 className="sr-only">상품 등록 페이지</h2>
      <RegisterProduct />
    </section>
  );
}
