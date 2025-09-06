/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS } from "../config/endpoint";

export function useFollowData(
  author_email: string,
  accessToken: string,
  nickname: string
) {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(COMMUNITY_ENDPOINTS.FOLLOW_USER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          following_user_email: author_email,
          nickname: nickname,
        }),
      });
      if (!res.ok) throw new Error("Failed to follow user");
      return res.json();
    },
    onMutate: async () => {
      const previousData = queryClient.getQueryData([
        "followData",
        author_email,
      ]);
      queryClient.setQueryData(["followData", author_email], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          is_follow: oldData.is_follow === 1 ? 0 : 1,
        };
      });
      return { previousData };
    },
    onError: (_err, _vars, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["followData", author_email],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["followData", author_email] });
    },
  });

  return { followMutation };
}
