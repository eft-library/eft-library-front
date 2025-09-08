/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";

export const useDeletePostByUser = (routeLink: string, accessToken: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_POST_BY_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    onSuccess: () => {
      // ✅ 캐시 무효화 → myPageDefaultData 다시 fetch
      queryClient.invalidateQueries({ queryKey: ["myPageDefaultData"] });

      // ✅ 성공 후 라우팅
      router.push(routeLink);
    },
    onError: (error: any) => {
      console.error("Failed to delete post:", error.message);
      router.push(routeLink); // 실패해도 이동할거면 여기에
    },
  });
};
