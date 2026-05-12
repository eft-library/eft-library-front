"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  AlertTriangle,
  Bell,
  FileText,
  MessageCircle,
  UserPlus,
} from "lucide-react";

import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { getMyPageNotificationsEndpoint } from "@/lib/config/api-endpoints";
import { cn } from "@/lib/utils/class-name";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import {
  getNotificationBody,
  getNotificationHref,
} from "@/lib/utils/notification";
import { useWsStore } from "@/store/ws-store";
import type {
  MyPageNotificationEntry,
  MyPageNotificationsResponse,
} from "@/types/api/mypage";

function getNotificationIcon(type: string) {
  switch (type) {
    case "penalty_user":
      return <AlertTriangle className="h-4 w-4" />;
    case "create_post":
      return <FileText className="h-4 w-4" />;
    case "create_parent_comment":
    case "create_child_comment":
      return <MessageCircle className="h-4 w-4" />;
    case "follow_user":
      return <UserPlus className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
}

function NotificationPreview({
  entry,
  onNavigate,
}: {
  entry: MyPageNotificationEntry;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={getNotificationHref(entry)}
      onClick={onNavigate}
      className={cn(
        "flex gap-3 px-4 py-3 text-left transition hover:bg-gray-50 dark:hover:bg-white/5",
        entry.is_read ? "opacity-75" : "bg-orange-50/70 dark:bg-orange-400/10",
      )}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          entry.noti_type === "penalty_user"
            ? "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300"
            : "bg-orange-100 text-orange-600 dark:bg-orange-400/15 dark:text-orange-300",
        )}
      >
        {getNotificationIcon(entry.noti_type)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
          {getNotificationBody(entry)}
        </span>
        <span className="mt-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          {formatIsoDateTime(entry.create_time)}
        </span>
      </span>
      {!entry.is_read ? (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
      ) : null}
    </Link>
  );
}

export function NotificationMenu({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const notifications = useWsStore((state) => state.notifications);
  const setNotifications = useWsStore((state) => state.setNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((entry) => !entry.is_read).length,
    [notifications],
  );
  const visibleNotifications = notifications.slice(0, 6);

  useEffect(() => {
    if (!accessToken) {
      setNotifications([]);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    authenticatedApiRequest<MyPageNotificationsResponse>(
      getMyPageNotificationsEndpoint(1),
      {
        accessToken,
        cache: "no-store",
      },
    )
      .then((data) => {
        if (isActive) {
          setNotifications(data.notifications);
        }
      })
      .catch(() => {
        // The websocket can still populate notifications when the fallback API fails.
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [accessToken, setNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAndNavigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div className="rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#25282e]">
        <Link
          href="/mypage/notifications"
          onClick={closeAndNavigate}
          className="flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold text-gray-800 transition hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300"
        >
          <span className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-orange-500" />
            알림
          </span>
          {unreadCount > 0 ? (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-black text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={menuRef}
      className="relative flex h-9 items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-label="알림"
        title="알림"
        onClick={() => setIsOpen((value) => !value)}
        onFocus={() => setIsOpen(true)}
        className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:bg-white dark:text-orange-500 dark:hover:bg-orange-50"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-500 px-1 text-[10px] font-black leading-5 text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className="absolute left-1/2 top-full z-30 mt-2 w-80 -translate-x-1/2 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-[''] dark:border-gray-600 dark:bg-[#25282e]">
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <h3 className="text-sm font-black text-gray-950 dark:text-white">
              알림
            </h3>
            {unreadCount > 0 ? (
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-black text-orange-600 dark:bg-orange-400/15 dark:text-orange-300">
                {unreadCount}개
              </span>
            ) : null}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {visibleNotifications.length > 0 ? (
              visibleNotifications.map((entry) => (
                <NotificationPreview
                  key={entry.id}
                  entry={entry}
                  onNavigate={closeAndNavigate}
                />
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {isLoading ? "알림을 불러오는 중입니다." : "새 알림이 없습니다."}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-2 dark:border-gray-700">
            <Link
              href="/mypage/notifications"
              onClick={closeAndNavigate}
              className="block rounded-md px-3 py-2 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
            >
              모든 알림 보기
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
