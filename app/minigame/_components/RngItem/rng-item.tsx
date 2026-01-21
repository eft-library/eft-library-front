"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useInvalidateRngItemsAt20, useRngItemList } from "./get-rng-item";
import RngItemNav from "./RngItemNav/rng-item-nav";
import { useEffect, useState } from "react";
import { DEFAULT_PLAY_TIME } from "@/lib/consts/libraryConsts";
import BackpackGrid from "./BackpackGrid/backpack-grid";
import ItemPool from "./ItemPool/item-pool";

export default function RngItem() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [score, setScore] = useState<number>(0);
  const [playTime, setPlayTime] = useState<number>(DEFAULT_PLAY_TIME);
  const [isStart, setIsStart] = useState<boolean>(false);

  useInvalidateRngItemsAt20();
  const { data: res, isLoading } = useRngItemList();

  // 1초마다 1씩 감소
  useEffect(() => {
    if (!isStart) return;

    const interval = setInterval(() => {
      setPlayTime((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStart]);

  const onClickReset = () => {
    setIsStart(false);
    setPlayTime(DEFAULT_PLAY_TIME);
    setScore(0);
  };

  if (isLoading || !res) return null;

  return (
    <div className="w-full h-full">
      <RngItemNav
        playTime={playTime}
        score={score}
        onClickReset={onClickReset}
      />
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-auto">
        {/* isStart === false 일 때 화면 가릴 창 필요*/}
        <div className="flex-1 flex items-start justify-center md:justify-end">
          <BackpackGrid itemList={res.data} />
        </div>

        <div className="flex-1 flex items-start justify-center md:justify-start">
          <div className="w-full max-w-sm">
            <ItemPool />
          </div>
        </div>
      </div>
    </div>
  );
}
