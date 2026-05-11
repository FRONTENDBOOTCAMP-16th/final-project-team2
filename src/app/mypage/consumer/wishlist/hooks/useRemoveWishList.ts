import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const useRemoveWishList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 실행할 mutation 함수 정의
    mutationFn: async (id: string) => {
      // 삭제 시 에러 발생 여부 확인
      const { error } = await supabase
        .from("product_likes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },

    //mutate 가 성공했을 때 실행되는 함수
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
    },
  });
};
