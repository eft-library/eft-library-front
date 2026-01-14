"use client";

import { Button } from "@/components/ui/button";
import { StationMapTypes } from "../hideout.types";
import { useMemo, useState } from "react";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { getMaxSuffix, getMaxSuffixNumber } from "@/lib/func/jsxfunction";
import { hideoutI18n, roadmapI18N } from "@/lib/consts/i18nConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { HelpCircle, Minus, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function StationMap({
  onClickReset,
  onClickResetItem,
  onChangeMaster,
  completeList,
  masterId,
  itemRequireInfo,
  userItemList,
  hideoutInfo,
  setUserItemList,
  onClickSaveItem,
}: StationMapTypes) {
  const MAX_COUNT = 999;

  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [tabState, setTabState] = useState<"station" | "items">("station");
  const [searchWord, setSearchWord] = useState<string>("");
  const [showUsageGuide, setShowUsageGuide] = useState(false);

  const userItemCountMap = useMemo(() => {
    const map = new Map<string, number>();

    userItemList.forEach((item) => {
      map.set(item.id, item.count);
    });

    return map;
  }, [userItemList]);

  const handleIncrease = (id: string) => {
    setUserItemList((prev) => {
      const found = prev.find((item) => item.id === id);

      if (!found) {
        return [{ id, count: 1 }, ...prev];
      }

      return prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.min(MAX_COUNT, item.count + 1) }
          : item
      );
    });
  };

  const handleDecrease = (id: string) => {
    setUserItemList((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, count: Math.max(0, item.count - 1) }
            : item
        )
        .filter((item) => item.count > 0)
    );
  };

  const handleChange = (id: string, value: number) => {
    setUserItemList((prev) => {
      if (Number.isNaN(value)) {
        return prev;
      }

      const clamped = Math.min(Math.max(0, value), MAX_COUNT);

      if (clamped === 0) {
        return prev.filter((item) => item.id !== id);
      }

      const exists = prev.find((item) => item.id === id);
      if (!exists) {
        return [...prev, { id, count: clamped }];
      }

      return prev.map((item) =>
        item.id === id ? { ...item, count: clamped } : item
      );
    });
  };

  const filteredItemRequireInfo = useMemo(() => {
    if (!searchWord.trim()) {
      return itemRequireInfo;
    }

    const keyword = searchWord.toLowerCase();

    return itemRequireInfo.filter((reqItem) =>
      [reqItem.name.en, reqItem.name.ko, reqItem.name.ja]
        .filter(Boolean)
        .some((name) => name.toLowerCase().includes(keyword))
    );
  }, [itemRequireInfo, searchWord]);

  return (
    <div className="dark:bg-gray-800/30 bg-white rounded-lg p-6 border border-border">
      <div className="mb-4 flex justify-end h-10">
        {tabState === "items" && (
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="item..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
      </div>

      <div className="h-[600px] overflow-y-scroll pr-2">
        {/* Facility/Items Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {tabState === "station" &&
            hideoutInfo.map((station) => (
              <div
                onClick={() => onChangeMaster(station.master_id)}
                key={`station-select-${station.master_id}`}
                className={`group relative rounded-lg border transition-all cursor-pointer ${
                  masterId === station.master_id
                    ? "bg-blue-50 border-blue-300 hover:bg-blue-100"
                    : "bg-muted border-border hover:bg-muted/80"
                }`}
              >
                <button
                  className={`w-full py-3 px-2 flex flex-col items-center gap-1 rounded-lg transition-colors ${
                    masterId === station.master_id
                      ? "text-blue-900"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="transition-transform group-hover:scale-105">
                    {getStationSVG(
                      station.master_id,
                      40,
                      40,
                      getMaxSuffix(station.master_id, completeList)
                    )}
                  </div>

                  <span className="text-sm font-semibold text-center leading-tight">
                    {station.master_name[localeKey]}
                  </span>
                </button>

                <div className="flex items-center justify-center px-2 pb-2">
                  <span
                    className={`text-sm font-semibold text-center transition-colors ${
                      masterId === station.master_id
                        ? "text-blue-700 group-hover:text-blue-800"
                        : "text-foreground group-hover:text-foreground"
                    }`}
                  >
                    Lv.{getMaxSuffixNumber(station.master_id, completeList)}
                  </span>
                </div>
              </div>
            ))}

          {tabState == "items" &&
            filteredItemRequireInfo.map((reqItem) => {
              const currentCount = userItemCountMap.get(reqItem.item_id) ?? 0;

              return (
                <div
                  key={`item-select-${reqItem.item_id}`}
                  className={`relative rounded-lg border`}
                >
                  <button className="w-full py-3 px-2 flex flex-col items-center gap-1 rounded-lg">
                    {/* 이미지 전용 영역 */}
                    <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                      <Image
                        src={reqItem.image || "/placeholder.svg"}
                        alt={reqItem.name.en}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>

                    {/* 텍스트 영역 */}
                    <span className="text-xs text-center leading-tight mt-1">
                      {reqItem.name[localeKey]}
                    </span>
                  </button>

                  <div className="flex items-center justify-between px-2 pb-2 gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrease(reqItem.item_id);
                      }}
                      className="h-6 w-6 p-0 hover:bg-muted"
                      disabled={currentCount === 0}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <div className="flex items-baseline gap-0.5">
                      <Input
                        type="number"
                        min={0}
                        value={currentCount.toString()}
                        onChange={(e) =>
                          handleChange(reqItem.item_id, Number(e.target.value))
                        }
                        onFocus={(e) => e.target.select()}
                        onClick={(e) => e.stopPropagation()}
                        className="
                          h-6 w-[4rem] p-0
                          text-xs font-semibold text-center
                          bg-muted/40
                          border border-border/40
                          rounded-sm
                          hover:border-border
                          focus:border-primary
                          focus-visible:ring-1 focus-visible:ring-primary/40
                          [appearance:textfield]
                          [&::-webkit-outer-spin-button]:appearance-none
                          [&::-webkit-inner-spin-button]:appearance-none
                        "
                      />
                      <span className="text-xs font-semibold text-foreground">
                        /&nbsp;{reqItem.quantity}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncrease(reqItem.item_id);
                      }}
                      className="h-6 w-6 p-0 hover:bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-2">
        <Button
          size="sm"
          onClick={() => setShowUsageGuide(true)}
          style={{ backgroundColor: "#6B7280", color: "#FFFFFF" }}
          className="hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          {hideoutI18n.usage[localeKey]}
        </Button>

        <div className="flex gap-2">
          {tabState === "station" && (
            <Button
              size="sm"
              onClick={onClickReset}
              style={{ backgroundColor: "#F43F5E", color: "#FFFFFF" }}
              className="hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {hideoutI18n.reset[localeKey]}
            </Button>
          )}
          {tabState === "items" && (
            <>
              <Button
                size="sm"
                onClick={onClickResetItem}
                style={{ backgroundColor: "#F43F5E", color: "#FFFFFF" }}
                className="hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {hideoutI18n.reset[localeKey]}
              </Button>
              <Button
                size="sm"
                onClick={onClickSaveItem}
                style={{ backgroundColor: "#10B981", color: "#FFFFFF" }}
                className="hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                {roadmapI18N.save[localeKey]}
              </Button>
            </>
          )}
          <Button
            size="sm"
            onClick={() =>
              setTabState(tabState === "station" ? "items" : "station")
            }
            style={{ backgroundColor: "#6366F1", color: "#FFFFFF" }}
            className="hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {tabState === "station"
              ? hideoutI18n.item[localeKey]
              : hideoutI18n.title[localeKey]}
          </Button>
        </div>
      </div>

      {showUsageGuide && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowUsageGuide(false)}
        >
          <div
            className="bg-card rounded-lg border border-border max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {hideoutI18n.usage[localeKey]}
              </h2>
              <button
                onClick={() => setShowUsageGuide(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Section 1 */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">
                  1️⃣ {hideoutI18n.usageGuide.section1.title[localeKey]}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {hideoutI18n.usageGuide.section1.contents[localeKey].map(
                    (text, idx) => (
                      <p key={idx}>{text}</p>
                    )
                  )}
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">
                  2️⃣ {hideoutI18n.usageGuide.section2.title[localeKey]}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {hideoutI18n.usageGuide.section2.blocks[localeKey].map(
                    (block, idx) => (
                      <p key={idx}>
                        <span className="text-foreground font-medium">
                          {block.label}
                        </span>
                        <br />
                        {block.lines.map((line, lineIdx) => (
                          <span key={lineIdx}>
                            {line}
                            {lineIdx < block.lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-foreground">
                  3️⃣ {hideoutI18n.usageGuide.section3.title[localeKey]}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  {hideoutI18n.usageGuide.section3.blocks[localeKey].map(
                    (block, idx) => (
                      <p key={idx}>
                        {block.lines.map((line, lineIdx) => (
                          <span key={lineIdx}>
                            {line}
                            {lineIdx < block.lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-border">
                <p className="text-base font-semibold text-foreground text-center">
                  {hideoutI18n.usageGuide.summary[localeKey].map(
                    (line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx <
                          hideoutI18n.usageGuide.summary[localeKey].length -
                            1 && <br />}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
