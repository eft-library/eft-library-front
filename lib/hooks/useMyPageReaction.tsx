/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";

export const useMyPageReaction = (accessToken: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deletePostByUser = useMutation({
    mutationFn: async (deleteInfo: { postId: string; routeLink: string }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_POST_BY_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: deleteInfo.postId }),
      });
      if (!res.ok) throw new Error("Failed to delete post");
      return res.json();
    },
    // ✅ onSuccess에서 variables로 routeLink 접근 가능
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["myPageDefaultData"] });
      queryClient.invalidateQueries({ queryKey: ["myPagePostsData"] });
      router.push(variables.routeLink); // 여기서 사용
    },
    onError: (error: any) => {
      console.error("Failed to delete post:", error.message);
    },
  });

  const deleteCommentByUser = useMutation({
    mutationFn: async (deleteInfo: { commentId: string }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_COMMENT_BY_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: deleteInfo.commentId }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPageDefaultData"] });
      queryClient.invalidateQueries({ queryKey: ["myPageCommentsData"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete comment:", error.message);
    },
  });

  return { deletePostByUser, deleteCommentByUser };
};
