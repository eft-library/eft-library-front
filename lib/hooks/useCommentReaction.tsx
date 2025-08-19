/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";

export function useCommentReaction(commentId: string, accessToken: string) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.LIKE_COMMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      if (!res.ok) throw new Error("Failed to like comment");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["commentData", commentId]);
      queryClient.setQueryData(["commentData", commentId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["commentData", commentId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["commentData", commentId] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DISLIKE_COMMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      if (!res.ok) throw new Error("Failed to dislike comment");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["commentData", commentId]);
      queryClient.setQueryData(["commentData", commentId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["commentData", commentId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["commentData", commentId] });
    },
  });
  return { likeMutation, dislikeMutation };
}
