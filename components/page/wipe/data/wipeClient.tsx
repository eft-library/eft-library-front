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
import { useState, useEffect } from "react";

export default function WipeClient({ wipeList }: WipeClient) {
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    setDurations(
      wipeList.map((wipe) => getDateRange(wipe.season_start, wipe.season_end))
    );
  }, [wipeList]);

  const calculateProgress = (dateNumber: number) => {
    const maxDate = Math.max(...durations);
    return maxDate > 0 ? Number(((dateNumber / maxDate) * 100).toFixed(2)) : 0;
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
              패치
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              시즌 시작
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              시즌 끝
            </TableHead>
            <TableHead className="w-[400px] text-center font-bold text-base text-white">
              시즌 기간
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wipeList.map((wipe, index) => (
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
                  <Progress
                    value={calculateProgress(durations[index] || 0)}
                    className="w-[200px] bg-CedarBrown"
                  />
                  <TextSpan size="lg" textColor="GoldenAmber">
                    {durations[index] || 0} 일
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
