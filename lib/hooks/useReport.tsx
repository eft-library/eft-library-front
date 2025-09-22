/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS, USER_API_ENDPOINTS } from "../config/endpoint";
import { requestUserData } from "../config/api";

export function useUserAction(
  session: any,
  onOpenChange: (open: boolean) => void,
  updateSession?: (data: any) => Promise<void>
) {
  // 🔹 게시글 신고
  const reportPostMutation = useMutation({
    mutationFn: async ({ postId, targetEmail, reason, details }: any) => {
      const data = await requestUserData(
        COMMUNITY_ENDPOINTS.REPORT_POST,
        {
          post_id: postId,
          reported_email: targetEmail,
          reason_type: reason,
          reason: details,
        },
        session
      );
      if (!data || data.status !== 200 || !data.data) {
        throw new Error(data?.msg || "Unknown error");
      }
      return data.data;
    },
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (err: any) => {
      console.error("Failed to report post:", err.message);
      onOpenChange(false);
    },
  });

  // 🔹 댓글 신고
  const reportCommentMutation = useMutation({
    mutationFn: async ({ commentId, targetEmail, reason, details }: any) => {
      const data = await requestUserData(
        COMMUNITY_ENDPOINTS.REPORT_COMMENT,
        {
          comment_id: commentId,
          reported_email: targetEmail,
          reason_type: reason,
          reason: details,
        },
        session
      );
      if (!data || data.status !== 200 || !data.data) {
        throw new Error(data?.msg || "Unknown error");
      }
      return data.data;
    },
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (err: any) => {
      console.error("Failed to report comment:", err.message);
      onOpenChange(false);
    },
  });

  // 🔹 사용자 신고
  const reportUserMutation = useMutation({
    mutationFn: async ({ targetEmail, reason, details }: any) => {
      const data = await requestUserData(
        USER_API_ENDPOINTS.REPORT_USER,
        {
          reported_email: targetEmail,
          reason_type: reason,
          reason: details,
        },
        session
      );
      if (!data || data.status !== 200 || !data.data) {
        throw new Error(data?.msg || "Unknown error");
      }
      return data.data;
    },
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (err: any) => {
      console.error("Failed to report user:", err.message);
      onOpenChange(false);
    },
  });

  // 🔹 사용자 차단
  const blockUserMutation = useMutation({
    mutationFn: async ({ targetEmail, details }: any) => {
      const data = await requestUserData(
        USER_API_ENDPOINTS.BLOCK_USER,
        {
          blocked_email: targetEmail,
          reason: details,
        },
        session
      );
      if (!data || data.status !== 200 || !data.data) {
        throw new Error(data?.msg || "Unknown error");
      }
      return data.data;
    },
    onSuccess: async (result) => {
      if (updateSession) {
        await updateSession((prev: any) => ({
          ...prev,
          userInfo: {
            ...prev?.userInfo,
            user_blocks: result.result,
          },
        }));
      }
      onOpenChange(false);
    },
    onError: (err: any) => {
      console.error("Failed to block user:", err.message);
      onOpenChange(false);
    },
  });

  return {
    reportPostMutation,
    reportCommentMutation,
    reportUserMutation,
    blockUserMutation,
  };
}
