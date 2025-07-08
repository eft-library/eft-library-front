"use client";

import dayjs from "dayjs";
import type { WipeViewTypes } from "./wipe.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DurationBar from "./DurationBar/duration-bar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import WipeCardM from "./WipeCard/wipe-card-m";

export default function WipeView({ wipeList }: WipeViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const getDateRange = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end).isValid() ? dayjs(end) : dayjs();
    return endDate.diff(startDate, "day");
  };

  const maxDuration = Math.max(
    ...wipeList.map((w) => getDateRange(w.season_start, w.season_end))
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                EFT Wipe Timeline
              </CardTitle>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                Escape from Tarkov patch history and wipe durations
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden lg:block rounded-lg border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold text-foreground text-center">
                      {itemI18N.wipe.version[localeKey]}
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-center">
                      {itemI18N.wipe.start[localeKey]}
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-center">
                      {itemI18N.wipe.end[localeKey]}
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-center">
                      {itemI18N.wipe.day[localeKey]}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wipeList.map((wipe, index) => (
                    <TableRow
                      key={`wipe-${wipe.id}`}
                      className={`hover:bg-muted/30 transition-colors ${
                        index === 0
                          ? "bg-orange-50/50 dark:bg-orange-950/20"
                          : ""
                      }`}
                    >
                      <TableCell className="font-mono font-medium text-left">
                        <div className="flex items-center gap-2">
                          {wipe.patch_version}
                          {index === 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                              Active
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-center">
                        {wipe.season_start}
                      </TableCell>
                      <TableCell className="font-mono text-center">
                        {wipe.season_end || (
                          <span className="text-muted-foreground">~</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DurationBar
                          duration={getDateRange(
                            wipe.season_start,
                            wipe.season_end
                          )}
                          maxDuration={maxDuration}
                          isActive={index === 0}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {wipeList.map((wipe, index) => (
                <WipeCardM
                  key={`wipe-m-${wipe.id}`}
                  wipe={wipe}
                  maxDuration={maxDuration}
                  isActive={index === 0}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <span>Active Wipe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400"></div>
                <span>Completed Wipe</span>
              </div>
              <div className="ml-auto">
                <span>Total Wipes: {wipeList.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
