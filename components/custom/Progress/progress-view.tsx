"use client";

import { useState } from "react";
import type { ProgressItemTypes, ProgressViewTypes } from "./progress.types";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, RotateCcw, Save } from "lucide-react";
import Image from "next/image";
import ProgressItem from "./progress-item";

export default function ProgressView({ progress }: ProgressViewTypes) {
  const tabList = [
    {
      id: "Kappa",
      title: "Kappa",
      image: "https://assets.tarkov.dev/5c093ca986f7740a1867ab12-8x.webp",
    },
    {
      id: "Rebirth",
      title: "Rebirth",
      image: "https://assets.tarkov.dev/prestige-1-image.webp",
    },
  ];
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Kappa");
  const [userRebirth, setUserRebirth] = useState<string[]>(
    progress.userRebirthList
  );
  const [userKappa, setUserKappa] = useState<string[]>(progress.userKappaList);

  // 아이템 클릭 시 탭에 따른 개별 배열에 저장
  const handleClick = (itemId: string) => {
    if (activeTab === "Rebirth") {
      setUserRebirth(
        (prev) =>
          prev.includes(itemId)
            ? prev.filter((id) => id !== itemId) // 있으면 삭제
            : [...prev, itemId] // 없으면 추가
      );
    } else if (activeTab === "Kappa") {
      setUserKappa((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    }
  };
  const currentTab = tabList.find((tab) => tab.id === activeTab);

  // 저장
  const handleSave = () => {};

  // 그냥 초기화만 저장은 안함 - 저장이 필요하면 handleSave 호출하면 된다.
  const handleReset = () => {
    if (activeTab === "Rebirth") {
      setUserRebirth([]);
    } else {
      setUserKappa([]);
    }
  };

  return (
    <div className="mx-auto max-w-[1504px]">
      {/* Header Box */}
      <div className="rounded-xl border border-border bg-card shadow-sm dark:bg-[#171717]">
        <div className="flex w-full items-center justify-between p-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-1 items-center gap-4 text-left transition-colors hover:opacity-80"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted/50">
              <Image
                src={currentTab?.image || ""}
                alt={currentTab?.id || ""}
                width={120}
                height={120}
                className="w-32 h-30 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            {/* Title */}
            <h2 className="text-lg font-semibold text-foreground md:text-xl">
              아이템
            </h2>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">초기화</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">저장</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0"
              aria-label={isExpanded ? "접기" : "펼치기"}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="border-t border-border">
            <div className="flex gap-2 border-b border-border px-6 pt-4">
              {tabList.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <img
                    src={tab.image}
                    alt={activeTab}
                    className="h-6 w-6 rounded object-contain"
                  />
                  <span className="hidden sm:inline">{tab.title}</span>
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
                        key={`rebirth-box-${id}`}
                      />
                    ))
                  : progress.allKappaItemList.map((kappa, id) => (
                      <ProgressItem
                        item={kappa}
                        handleClick={handleClick}
                        key={`kappa-box-${id}`}
                      />
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
