import { fetchDelivery } from "@/app/mypage/api/fetchDelivery";
import { useQuery } from "@tanstack/react-query";

export const useDeliveryQuery = () => {
  return useQuery({
    queryKey: ["delivery"],
    queryFn: fetchDelivery,
  });
};
