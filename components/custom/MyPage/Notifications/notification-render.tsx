import {
  Bell,
  MessageCircle,
  UserPlus,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { NotificationRenderTypes } from "../my-page.types";
import Link from "next/link";

export function NotificationMessage({ notification }: NotificationRenderTypes) {
  const { theme } = useTheme();

  const renderNotificationContent = () => {
    switch (notification.noti_type) {
      case "penalty_user":
        return (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-red-400" : "text-red-600"
                }`}
              >
                계정 제재 알림
              </p>
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                귀하의 계정({notification.user_email})에 제재가 적용되었습니다.
              </p>
              {notification.end_time && (
                <p
                  className={`text-xs mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  제재 종료:{" "}
                  {new Date(notification.end_time).toLocaleDateString("ko-KR")}
                </p>
              )}
            </div>
          </div>
        );

      case "create_post":
        return (
          <Link target="_blank" href={`/community/detail/${notification.url}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  새 게시글
                </p>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <span className="font-medium">
                    {notification.author_nickname}
                  </span>
                  님이 새 게시글 "{notification.title}"을 작성했습니다.
                </p>
              </div>
            </div>
          </Link>
        );

      case "create_parent_comment":
        return (
          <Link target="_blank" href={`/community/detail/${notification.url}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  새 댓글
                </p>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <span className="font-medium">
                    {notification.author_nickname}
                  </span>
                  님이 "{notification.title}" 게시글에 댓글을 남겼습니다.
                </p>
              </div>
            </div>
          </Link>
        );

      case "create_child_comment":
        return (
          <Link target="_blank" href={`/community/detail/${notification.url}`}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}
                >
                  새 대댓글
                </p>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <span className="font-medium">
                    {notification.author_nickname}
                  </span>
                  님이 댓글에 답글을 남겼습니다.
                </p>
              </div>
            </div>
          </Link>
        );

      case "follow_user":
        return (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <p
                className={`font-medium ${
                  theme === "dark" ? "text-orange-400" : "text-orange-600"
                }`}
              >
                새 팔로워
              </p>
              <p
                className={`text-sm mt-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <span className="font-medium">
                  {notification.author_nickname}
                </span>
                님이 회원님을 팔로우하기 시작했습니다.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Bell className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ""
              </p>
            </div>
          </div>
        );
    }
  };

  return <div className="w-full">{renderNotificationContent()}</div>;
}
