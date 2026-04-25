import { dummyOrders } from "@/data/dummyOrder";
import Image from "next/image";
import Link from "next/link";

const MAX_COUNT = 9;

export default function WishListItemsList() {
  const wishlistItem = dummyOrders.slice(0, MAX_COUNT);
  return wishlistItem.map((item) => (
    <div key={item.id} className="flex flex-row gap-5">
      <Link href={`/products/pen/${item.id}`}>
        <Image
          width={200}
          height={200}
          className="object-fill"
          src={item.image}
          alt=""
        />
        <h2 className="self-center">{item.name}</h2>
      </Link>
    </div>
  ));
}
