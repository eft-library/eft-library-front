"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import Loading from "../../Loading/loading";
import { NotificationsTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { formatISODateTime } from "@/lib/func/formatTime";
import { NotificationMessage } from "./notification-render";

export default function Notifications() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;

  const fetchNotificationsData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_NOTIFICATION
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: notificationsData, isLoading } = useQuery<NotificationsTypes>({
    queryKey: ["myPageNotificationsData", pageNum],
    queryFn: () => fetchNotificationsData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !notificationsData) return <Loading />;

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
          <Bell className="w-5 h-5" />
          <span>
            알림 (
            {notificationsData.notifications.filter((n) => !n.is_read).length})
          </span>
          <div
            className={`flex items-center space-x-1 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <span className="text-xs font-medium">알림은 7일간 저장됩니다</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {notificationsData.notifications.map((notification, index) => (
            <div
              key={`${index}-${notification.created_time}-${notification.noti_type}`}
              className={`p-4 rounded-lg border ${
                !notification.is_read
                  ? theme === "dark"
                    ? "border-orange-400/50 bg-orange-400/10"
                    : "border-orange-500/50 bg-orange-50"
                  : theme === "dark"
                  ? "border-gray-700/50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <NotificationMessage notification={notification.payload} />
                  <div
                    className={`text-sm mt-1 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {formatISODateTime(notification.created_time)}
                  </div>
                </div>
                {!notification.is_read && (
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        {notificationsData.total_count > 0 && (
          <CustomPagination
            total={notificationsData.max_page_count}
            routeLink={`/mypage/notifications?page=`}
            currentPage={Number(pageNum)}
          />
        )}
      </CardContent>
    </Card>
  );
}
