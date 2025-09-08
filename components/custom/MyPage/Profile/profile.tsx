"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { requestGetUserData } from "@/lib/config/api";
import { useQuery } from "@tanstack/react-query";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "../../Loading/loading";
import { ProfileTypes } from "../my-page.types";
import { getBanStatus } from "@/lib/func/userFunction";
import { formatISODate } from "@/lib/func/formatTime";

export default function Profile() {
  const { data: session } = useSession();
  const { theme } = useTheme();

  const fetchProfileData = async () => {
    const data = await requestGetUserData(
      `${USER_API_ENDPOINTS.MY_PAGE_INFO}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: profileData, isLoading } = useQuery<ProfileTypes>({
    queryKey: ["myPagePRofileData"],
    queryFn: () => fetchProfileData(),
  });

  if (isLoading || !profileData) return <Loading />;

  const banStatus = getBanStatus(
    session?.userInfo.start_time,
    session?.userInfo.end_time
  );

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
          <Settings className="w-5 h-5" />
          <span>사용자 정보</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {banStatus === "permanent" && (
          <div className="flex-1 p-4 rounded-lg border border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 text-center">
            <p className="font-semibold">활동이 영구적으로 제한되었습니다.</p>
            <p className="text-sm mt-1">{profileData.reason}</p>
          </div>
        )}

        {banStatus === "temporary" && (
          <div className="flex-1 p-4 rounded-lg border border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-center">
            <p className="font-semibold">
              현재 활동이 일시적으로 제한되었습니다.
            </p>
            <p className="text-sm mt-1">
              제재 해제 시간:
              <span className="font-mono">
                {new Date(profileData.end_time ?? "").toLocaleString()}
              </span>
            </p>
            <p className="text-xs mt-1">{profileData.reason}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              이메일
            </label>
            <Input
              value={profileData.email}
              disabled
              className={`${
                theme === "dark"
                  ? "bg-[#36393f] border-gray-600 text-gray-300 disabled:text-gray-300"
                  : "bg-gray-50 border-gray-300 text-gray-700 disabled:text-gray-700"
              }`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              가입일
            </label>
            <Input
              value={formatISODate(profileData.create_time)}
              disabled
              className={`${
                theme === "dark"
                  ? "bg-[#36393f] border-gray-600 text-gray-300 disabled:text-gray-300"
                  : "bg-gray-50 border-gray-300 text-gray-700 disabled:text-gray-700"
              }`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              출석일 수
            </label>
            <div className="flex items-center space-x-2">
              <Badge
                className={`${
                  theme === "dark"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                {profileData.attendance_count}
              </Badge>
            </div>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              포인트
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-orange-400 font-semibold">도입 예정</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
