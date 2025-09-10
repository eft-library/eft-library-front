/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS, USER_API_ENDPOINTS } from "../config/endpoint";

export const useMyPageReaction = (accessToken: string) => {
  const queryClient = useQueryClient();
  const deletePostByUser = useMutation({
    mutationFn: async (deleteInfo: { postId: string }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPageDefaultData"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["myPagePostsData"],
        exact: false,
      });
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
      queryClient.invalidateQueries({
        queryKey: ["myPageDefaultData"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["myPageCommentsData"],
        exact: false,
      });
    },
    onError: (error: any) => {
      console.error("Failed to delete comment:", error.message);
    },
  });

  const deleteBookmark = useMutation({
    mutationFn: async (deleteInfo: { postId: string }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.BOOKMARK_POST, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: deleteInfo.postId }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPageBookmarksData"],
        exact: false,
      });
    },
    onError: (error: any) => {
      console.error("Failed to delete comment:", error.message);
    },
  });

  const deleteFollow = useMutation({
    mutationFn: async (deleteInfo: {
      following_user_email: string;
      nickname: string;
    }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.FOLLOW_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          following_user_email: deleteInfo.following_user_email,
          nickname: deleteInfo.nickname,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPageDefaultData"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["myPageFollowData"],
        exact: false,
      });
    },
    onError: (error: any) => {
      console.error("Failed to delete comment:", error.message);
    },
  });

  const deleteBlock = useMutation({
    mutationFn: async (deleteInfo: { targetEmail: string }) => {
      const res = await fetch(USER_API_ENDPOINTS.UNBLOCK_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocked_email: deleteInfo.targetEmail,
          reason: "",
        }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPageBlocksData"],
        exact: false,
      });
    },
    onError: (error: any) => {
      console.error("Failed to delete comment:", error.message);
    },
  });

  return {
    deletePostByUser,
    deleteCommentByUser,
    deleteBookmark,
    deleteFollow,
    deleteBlock,
  };
};
