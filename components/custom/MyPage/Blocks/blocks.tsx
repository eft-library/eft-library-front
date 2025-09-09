"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { UserLock, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../../Loading/loading";
import { BlocksTypes } from "../my-page.types";
import { formatISODateTime } from "@/lib/func/formatTime";
import CustomPagination from "../../CustomPagination/custom-pagination";

export default function Blocks() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deleteBlock, setDeleteBlock] = useState({
    blocked_email: "",
    deleteOpen: false,
  });

  const fetchBlocksData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_BLOCKS
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: blocksData, isLoading } = useQuery<BlocksTypes>({
    queryKey: ["myPageBlocksData"],
    queryFn: () => fetchBlocksData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !blocksData) return <Loading />;
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
          <UserLock className="w-5 h-5" /> {/* UserX에서 UserLock으로 변경 */}
          <span>차단한 사용자 ({blocksData.total_count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {blocksData.blocks.map((user) => (
            <div
              key={user.blocked_email}
              className={`relative p-4 rounded-lg border ${
                theme === "dark" ? "border-gray-700/50" : "border-gray-200"
              }`}
            >
              <button
                // onClick={() => {
                //   setSelectedBlockedUser(user);
                //   setShowUnblockModal(true);
                // }}
                className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                    : "text-gray-500 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="pr-8">
                <h3
                  className={`font-medium mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.nickname}
                </h3>
                <div
                  className={`text-sm space-y-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <div>
                    <span className="font-medium">차단 사유:</span>{" "}
                    {user.reason}
                  </div>
                  <div>
                    <span className="font-medium">차단일:</span>{" "}
                    {formatISODateTime(user.create_time)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {blocksData.total_count > 0 && (
          <CustomPagination
            total={blocksData.max_page_count}
            routeLink={`/mypage/blocks?page=`}
            currentPage={Number(pageNum)}
          />
        )}
      </CardContent>
    </Card>
  );
}
