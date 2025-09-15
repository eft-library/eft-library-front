/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";
import { useRouter } from "next/navigation";

export function usePostMetaData(postId: string, accessToken: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.LIKE_POST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to like post");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["postMetaData", postId]);
      queryClient.setQueryData(["postMetaData", postId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["postMetaData", postId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postMetaData", postId] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DISLIKE_POST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to dislike post");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["postMetaData", postId]);
      queryClient.setQueryData(["postMetaData", postId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["postMetaData", postId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postMetaData", postId] });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.BOOKMARK_POST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to bookmark post");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["postMetaData", postId]);
      queryClient.setQueryData(["postMetaData", postId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["postMetaData", postId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postMetaData", postId] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (routeLink: string) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_POST_BY_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to delete post");
      router.push(routeLink);
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["postMetaData", postId]);
      queryClient.setQueryData(["postMetaData", postId], (oldData: any) => {
        return oldData;
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["postMetaData", postId],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["postMetaData", postId] });
    },
  });

  return {
    likeMutation,
    dislikeMutation,
    bookmarkMutation,
    deletePostMutation,
  };
}
