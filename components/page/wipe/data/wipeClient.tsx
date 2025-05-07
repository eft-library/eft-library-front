"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import dayjs from "dayjs";
import { Progress } from "@/components/ui/progress";
import type { WipeClient } from "./wipeTypes";
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

export default function WipeClient({ wipeList }: WipeClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const calculateProgress = (dateNumber: number) => {
    const durations = wipeList.map((wipe) =>
      getDateRange(wipe.season_start, wipe.season_end)
    );
    const maxDate = Math.max(...durations);
    return Number(((dateNumber / maxDate) * 100).toFixed(2));
  };

  const getDateRange = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end).isValid() ? dayjs(end) : dayjs();
    return endDate.diff(startDate, "day");
  };
  return (
    <div className="w-full">
      <Table className="border-2 border-white border-solid">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-base text-white text-center">
              {itemI18N.wipe.version[localeKey]}
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              {itemI18N.wipe.start[localeKey]}
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              {itemI18N.wipe.end[localeKey]}
            </TableHead>
            <TableHead className="w-[400px] text-center font-bold text-base text-white">
              {itemI18N.wipe.day[localeKey]}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wipeList.map((wipe) => (
            <TableRow key={wipe.id}>
              <TableCell className="text-center">
                <TextSpan size="lg">{wipe.patch_version}</TextSpan>
              </TableCell>
              <TableCell className="text-center">
                <TextSpan size="lg">{wipe.season_start}</TextSpan>
              </TableCell>
              <TableCell className="text-center">
                <TextSpan size="lg">{wipe.season_end}</TextSpan>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex w-full gap-4 items-center">
                  <TextSpan size="lg">
                    <Progress
                      value={calculateProgress(
                        getDateRange(wipe.season_start, wipe.season_end)
                      )}
                      className="w-[200px] bg-CedarBrown"
                    />
                  </TextSpan>
                  <TextSpan size="lg" textColor="GoldenAmber">
                    {getDateRange(wipe.season_start, wipe.season_end)} 일
                  </TextSpan>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
