"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useTheme } from "next-themes";
import { NotificationTypes } from "./nav-bar.types";
import Link from "next/link";
import { NotificationMessage } from "../MyPage/Notifications/notification-render";

export default function Notification({
  setActiveMenu,
  activeMenu,
  notificationList,
  setNotifications,
}: NotificationTypes) {
  const { theme } = useTheme();
  return (
    <div
      className="relative"
      onMouseEnter={() => setActiveMenu("notifications")}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Button
        variant="ghost"
        className={`cursor-pointer relative flex items-center space-x-1 transition-colors text-sm py-2 h-auto ${
          theme === "dark"
            ? "text-white hover:text-orange-400 hover:bg-transparent"
            : "text-gray-700 hover:text-orange-500 hover:bg-transparent"
        }`}
      >
        <Bell className="w-4 h-4" />
        {notificationList.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notificationList.length}
          </span>
        )}
      </Button>

      {/* 알림 드롭다운 */}
      {activeMenu === "notifications" && (
        <div
          className={`absolute top-full right-0 mt-0 w-80 border rounded-md shadow-lg z-50 ${
            theme === "dark"
              ? "bg-[#2a2d35] border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="py-2">
            <div
              className={`px-4 py-2 border-b ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-sm font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                알림 ({notificationList.length}개의 새 알림)
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notificationList.map((notification, index) => (
                <NotificationMessage
                  notification={notification}
                  key={`notification-${index}`}
                />
              ))}
            </div>
            <div
              className={`px-4 py-2 border-t ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <Link href={"/mypage/notifications?page=1"}>
                <Button
                  variant="ghost"
                  onClick={() => setNotifications([])}
                  className={`cursor-pointer w-full text-sm transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  모든 알림 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
