"use client";

import { Card, CardContent } from "@/components/ui/card";
import DurationBar from "../DurationBar/duration-bar";
import { WipeCardTypes } from "../wipe.types";
import dayjs from "dayjs";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";

export default function WipeCardM({
  wipe,
  isActive,
  maxDuration,
}: WipeCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const getDateRange = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end).isValid() ? dayjs(end) : dayjs();
    return endDate.diff(startDate, "day");
  };

  return (
    <Card
      className={`${
        isActive
          ? "ring-2 ring-orange-400/50 bg-orange-50/50 dark:bg-orange-950/20"
          : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg">
              {wipe.patch_version}
            </span>
            {isActive && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                Active
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {itemI18N.wipe.start[localeKey]}
            </span>
            <span className="font-mono text-sm">{wipe.season_start}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {itemI18N.wipe.end[localeKey]}
            </span>
            <span className="font-mono text-sm">
              {wipe.season_end || (
                <span className="text-muted-foreground">~</span>
              )}
            </span>
          </div>

          <div className="pt-2">
            <div className="text-sm text-muted-foreground mb-2">
              {itemI18N.wipe.day[localeKey]}
            </div>
            <DurationBar
              duration={getDateRange(wipe.season_start, wipe.season_end)}
              isActive={isActive}
              isMobile={true}
              maxDuration={maxDuration}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
