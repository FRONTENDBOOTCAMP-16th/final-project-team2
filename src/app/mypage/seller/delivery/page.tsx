import DeliveryProductList from "./components/DeliveryProductList";

export default function SellerDeliveryStatusPage() {
  return (
    <section className="flex flex-col gap-4 px-6 pt-12.5 m-auto w-full lg:w-243 bg-white">
      <DeliveryProductList />
    </section>
  );
}
