"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { FollowUserTypes, CheckFollowTypes } from "../../community.types";
import { requestPostData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/custom/Loading/loading";
import { useFollowData } from "@/lib/hooks/useFollow";
import { useState } from "react";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";

export default function FollowUser({ author_email }: FollowUserTypes) {
  const { data: session } = useSession();
  const { followMutation } = useFollowData(
    author_email,
    session?.accessToken || ""
  );
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const fetchFollowData = async (email: string): Promise<CheckFollowTypes> => {
    const data = await requestPostData(`${COMMUNITY_ENDPOINTS.CHECK_FOLLOW}`, {
      following_user_email: author_email,
      user_email: email,
    });

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch user follow data");
    }
    return data.data;
  };
  const userEmail = session?.email ?? "";

  const { data: followData, isLoading } = useQuery({
    queryKey: ["followData", author_email],
    queryFn: () => fetchFollowData(userEmail),
  });

  const onClickReaction = () => {
    if (session && session.email) {
      followMutation.mutate();
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  if (isLoading || !followData) return <Loading />;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className={`w-full  ${
          followData.is_follow === 1
            ? " bg-orange-500 hover:bg-orange-600 text-white"
            : "dark:bg-gray-600 bg-gray-200 hover:bg-gray-500 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        } cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700`}
        onClick={onClickReaction}
      >
        {followData.is_follow === 1 ? "팔로잉" : "언팔로우"}
      </Button>
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
