"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useInvalidateRngItemsAt20, useRngItemList } from "./get-rng-item";
import RngItemNav from "./RngItemNav/rng-item-nav";
import { useState } from "react";
import { DEFAULT_PLAY_TIME } from "@/lib/consts/libraryConsts";

export default function RngItem() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [score, setScore] = useState<number>(0);
  const [playTime, setPlayTime] = useState<number>(DEFAULT_PLAY_TIME);

  useInvalidateRngItemsAt20();
  const { data, isLoading } = useRngItemList();

  const onClickReset = () => {};

  if (isLoading) return null;

  // 상단 정보
  // 중앙 정보
  return (
    <div>
      <RngItemNav
        playTime={playTime}
        score={score}
        onClickReset={onClickReset}
      />
    </div>
  );
}
