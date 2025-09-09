"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import UpdateNicknameWrapper from "./update-nickname-wrapper";
import { Edit2, UserLock } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { requestGetUserData } from "@/lib/config/api";
import Loading from "../../Loading/loading";
import { useState } from "react";
import { DefaultInfoTypes, MyPageViewTypes } from "../my-page.types";
import Link from "next/link";
import { MYPAGE_TAB_LIST } from "@/lib/consts/community-consts";
import Profile from "../Profile/profile";
import Posts from "../Posts/posts";
import { Badge } from "@/components/ui/badge";

export default function MyPageView({ route }: MyPageViewTypes) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const fetchDefaultData = async () => {
    const data = await requestGetUserData(
      `${USER_API_ENDPOINTS.MY_PAGE_DEFAULT}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: defaultData, isLoading } = useQuery<DefaultInfoTypes>({
    queryKey: ["myPageDefaultData"],
    queryFn: () => fetchDefaultData(),
  });

  if (isLoading || !defaultData) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-80">
          <Card
            className={`${
              theme === "dark"
                ? "bg-gray-800/30 border-gray-700/50"
                : "bg-white border-gray-200"
            }`}
          >
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CardTitle
                  className={`${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {session?.userInfo.nickname ?? ""}
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setOpen(true)}
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {defaultData.post_count}
                  </div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    작성글
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {defaultData.comment_count}
                  </div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    댓글
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {defaultData.follow_count}
                  </div>
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    팔로잉
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <div className="mt-6 space-y-2">
            {MYPAGE_TAB_LIST.map((tab) => (
              <Link key={tab.id} href={tab.link}>
                <button
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    route === tab.id
                      ? theme === "dark"
                        ? "bg-orange-400/20 text-white border border-orange-400/30"
                        : "bg-orange-50 text-orange-800 border border-orange-200"
                      : theme === "dark"
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.ko}</span>
                  {tab.id === "notifications" && (
                    <Badge className="ml-auto bg-orange-400 text-white">
                      {defaultData.notification_count}
                    </Badge>
                  )}
                </button>
              </Link>
            ))}

            <button
              // onClick={() => setShowWithdrawModal(true)}
              className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 mt-4 border-t pt-4 rounded ${
                theme === "dark"
                  ? "text-red-300 hover:text-red-200 hover:bg-red-500/10 border-gray-700"
                  : "text-red-700 hover:text-red-800 hover:bg-red-50 border-gray-200"
              }`}
            >
              <UserLock className="w-5 h-5" />
              <span>회원 탈퇴</span>
            </button>
          </div>
        </div>
        <div className="flex-1">
          {route === "profile" && <Profile />} {route === "posts" && <Posts />}
        </div>
      </div>
      <UpdateNicknameWrapper open={open} setOpen={setOpen} />
    </div>
  );
}
