"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function DefaultInfo() {
  const { theme } = useTheme();
  return (
    <Card
      className={`${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {isEditingNickname ? (
            <div className="flex items-center space-x-2">
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={`text-center ${
                  theme === "dark"
                    ? "bg-[#36393f] border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />
              <Button
                size="sm"
                onClick={handleNicknameSave}
                className={`${
                  theme === "dark"
                    ? "bg-gray-600 hover:bg-gray-500"
                    : "bg-gray-800 hover:bg-gray-700"
                } text-white`}
              >
                저장
              </Button>
            </div>
          ) : (
            <>
              <CardTitle
                className={`${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {nickname}
              </CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingNickname(true)}
                className={`${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {mockPosts.length}
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
              {mockComments.length}
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
              {mockFollowing.length}
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
  );
}
