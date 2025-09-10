"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../../Loading/loading";
import { FollowingTypes, UnfollowStateTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import UnFollowModal from "../Modal/unfollow-modal";

export default function Following() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deleteFollow, setDeleteFollow] = useState<UnfollowStateTypes>({
    followInfo: null,
    deleteOpen: false,
  });

  const fetchFollowsData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_FOLLOW
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: followData, isLoading } = useQuery<FollowingTypes>({
    queryKey: ["myPageFollowData", pageNum],
    queryFn: () => fetchFollowsData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !followData) return <Loading />;

  return (
    <Card
      className={`${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>팔로우한 유저 ({followData.total_count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {followData.follow.map((user, index) => (
            <div
              key={`${index}-${user.following_email}`}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                theme === "dark" ? "border-gray-700/50" : "border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div>
                  <h3
                    className={`font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {user.nickname}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {user.post_count}개 게시글
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setDeleteFollow({ deleteOpen: true, followInfo: user });
                }}
                className="border-[#e03131] dark:border-[#ff6b6b] text-[#e03131] dark:text-[#ff6b6b] hover:bg-[#e03131] dark:hover:bg-[#ff6b6b] hover:text-white dark:hover:text-white active:bg-[#c92a2a] dark:active:bg-[#e03131] bg-transparent"
              >
                언팔로우
              </Button>
            </div>
          ))}
        </div>
        {followData.total_count > 0 && (
          <CustomPagination
            total={followData.max_page_count}
            routeLink={`/mypage/following?page=`}
            currentPage={Number(pageNum)}
          />
        )}
        {deleteFollow.deleteOpen && (
          <UnFollowModal
            setDeleteFollow={setDeleteFollow}
            followInfo={deleteFollow.followInfo}
          />
        )}
      </CardContent>
    </Card>
  );
}
