"use client";

import { useState } from "react";
import type { ProgressViewTypes } from "./progress.types";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RotateCcw, Save } from "lucide-react";
import Image from "next/image";
import ProgressItem from "./progress-item";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N, progressI18N } from "@/lib/consts/i18nConsts";
import { progressTabList } from "@/lib/consts/libraryConsts";
import { useSession } from "next-auth/react";
import DefaultDialog from "../DefaultDialog/default-dialog";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";

export default function ProgressView({ progress }: ProgressViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Kappa");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [userRebirth, setUserRebirth] = useState<string[]>(
    progress.userRebirthList,
  );
  const [userKappa, setUserKappa] = useState<string[]>(progress.userKappaList);

  // 아이템 클릭 시 탭에 따른 개별 배열에 저장
  const handleClick = (itemId: string) => {
    if (activeTab === "Rebirth") {
      setUserRebirth(
        (prev) =>
          prev.includes(itemId)
            ? prev.filter((id) => id !== itemId) // 있으면 삭제
            : [...prev, itemId], // 없으면 추가
      );
    } else if (activeTab === "Kappa") {
      setUserKappa((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId],
      );
    }
  };
  const currentTab = progressTabList.find((tab) => tab.id === activeTab);

  // 저장
  const handleSave = async () => {
    if (session && session.email) {
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_USER_PROGRESS,
        { userRebirth: userRebirth, userKappa: userKappa },
        session,
      );
      if (response?.status === 200) {
        if (activeTab === "Rebirth") {
          setUserRebirth(response.data.userRebirthList);
        } else {
          setUserKappa(response.data.userKappaList);
        }
        setAlertDesc(alertMessageI18N.save[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
      } else {
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  // 그냥 초기화만 저장은 안함 - 저장이 필요하면 handleSave 호출하면 된다.
  const handleReset = () => {
    if (activeTab === "Rebirth") {
      setUserRebirth([]);
    } else {
      setUserKappa([]);
    }
  };

  return (
    <div className="mx-auto">
      {/* Header Box - Applied modern design with gradients and shadows */}
      <div className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 border-0 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40 hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/60 transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative flex w-full items-center justify-between p-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-1 items-center gap-4 text-left transition-colors hover:opacity-80"
          >
            <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br p-0.5">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                <Image
                  src={currentTab?.image || ""}
                  alt={currentTab?.id || ""}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
            {/* Title - Updated text styling */}
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">
              {progressI18N.title[localeKey]}
            </h2>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">
                {progressI18N.reset[localeKey]}
              </span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="gap-2 bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">
                {progressI18N.save[localeKey]}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0 rounded-xl bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 transition-all duration-200"
              aria-label={isExpanded ? "접기" : "펼치기"}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="flex gap-2 border-b border-gray-200/50 dark:border-gray-700/50 px-6 pt-4">
              {progressTabList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-linear-to-br from-blue-500/90 to-blue-600/90 text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                    <Image
                      src={tab.image || "/placeholder.svg"}
                      alt={activeTab}
                      width={64}
                      height={64}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="hidden sm:inline">
                    {tab.tab_title[localeKey]}
                  </span>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9">
                {activeTab === "Rebirth"
                  ? progress.allRebirthList.map((rebirth, id) => (
                      <ProgressItem
                        item={rebirth}
                        handleClick={handleClick}
                        currentUserList={userRebirth}
                        key={`rebirth-box-${id}`}
                      />
                    ))
                  : progress.allKappaItemList.map((kappa, id) => (
                      <ProgressItem
                        item={kappa}
                        handleClick={handleClick}
                        currentUserList={userKappa}
                        key={`kappa-box-${id}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
