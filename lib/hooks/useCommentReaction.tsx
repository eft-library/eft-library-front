/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";

export function useCommentReaction(postId: string, accessToken: string) {
  const queryClient = useQueryClient();

  // 공통 invalidate 함수
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["commentData", postId] });

  // ---------------- 댓글 작성 ----------------
  const createParentComment = useMutation({
    mutationFn: async (newComment: {
      contents: string;
      nickname: string;
      slug: string;
    }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.CREATE_PARENT_COMMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newComment, post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to create comment");
      return res.json();
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["commentData", postId] });
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) => [
        {
          id: `temp-${Date.now()}`,
          contents: newComment.contents,
          isPending: true,
        },
        ...old,
      ]);

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 작성 ----------------
  const createChildComment = useMutation({
    mutationFn: async (newComment: {
      contents: string;
      parent_comment_id: string;
      nickname: string;
      slug: string;
    }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.CREATE_CHILD_COMMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newComment, post_id: postId }),
      });
      if (!res.ok) throw new Error("Failed to create comment");
      return res.json();
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["commentData", postId] });
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) => [
        {
          id: `temp-${Date.now()}`,
          contents: newComment.contents,
          isPending: true,
        },
        ...old,
      ]);

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 수정 ----------------
  const updateComment = useMutation({
    mutationFn: async (comment: { comment_id: string; contents: string }) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.UPDATE_COMMENT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (!res.ok) throw new Error("Failed to update comment");
      return res.json();
    },
    onMutate: async (updatedComment) => {
      await queryClient.cancelQueries({ queryKey: ["commentData", postId] });
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) =>
        old.map((c) =>
          c.id === updatedComment.comment_id
            ? { ...c, contents: updatedComment.contents, isPending: true }
            : c
        )
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 사용자 삭제 ----------------
  const deleteCommentByUser = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_COMMENT_BY_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["commentData", postId] });
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) =>
        old.filter((c) => c.id !== commentId)
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 관리자 삭제 ----------------
  const deleteCommentByAdmin = useMutation({
    mutationFn: async (commentId: string) => {
      const res = await fetch(COMMUNITY_ENDPOINTS.DELETE_COMMENT_BY_ADMIN, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: commentId }),
      });
      if (!res.ok) throw new Error("Failed to delete comment");
      return res.json();
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ["commentData", postId] });
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) =>
        old.filter((c) => c.id !== commentId)
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 좋아요 ----------------
  const likeComment = useMutation({
    mutationFn: async (commentId: string) => {
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
    onMutate: async (commentId) => {
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) =>
        old.map((c) =>
          c.id === commentId ? { ...c, likeCount: (c.likeCount || 0) + 1 } : c
        )
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  // ---------------- 댓글 싫어요 ----------------
  const dislikeComment = useMutation({
    mutationFn: async (commentId: string) => {
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
    onMutate: async (commentId) => {
      const previous = queryClient.getQueryData<any[]>(["commentData", postId]);

      queryClient.setQueryData(["commentData", postId], (old: any[] = []) =>
        old.map((c) =>
          c.id === commentId
            ? { ...c, dislikeCount: (c.dislikeCount || 0) + 1 }
            : c
        )
      );

      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous)
        queryClient.setQueryData(["commentData", postId], ctx.previous);
    },
    onSettled: invalidate,
  });

  return {
    createParentComment,
    createChildComment,
    likeComment,
    dislikeComment,
    updateComment,
    deleteCommentByAdmin,
    deleteCommentByUser,
  };
}
