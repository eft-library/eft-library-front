"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useInvalidateRngItemsAt20, useRngItemList } from "./get-rng-item";
import RngItemNav from "./RngItemNav/rng-item-nav";
import { useEffect, useState } from "react";
import {
  BACKPACK_HEIGHT,
  CELL_SIZE,
  DEFAULT_PLAY_TIME,
} from "@/lib/consts/libraryConsts";
import BackpackGrid from "./BackpackGrid/backpack-grid";
import type { PlacedItem, DragState, RngItemTypes } from "../minigame-types";
import { getRandomItems } from "@/lib/func/rngItemFunction";
import ItemPool from "./ItemPool/item-pool";

export default function RngItem() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [score, setScore] = useState<number>(0);
  const [playItemList, setPlayItemList] = useState<RngItemTypes[]>([]);
  const [playTime, setPlayTime] = useState<number>(DEFAULT_PLAY_TIME);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
  // 아이템 드래그 시 클릭한 대상의 정보 및 좌표 필요

  useInvalidateRngItemsAt20();
  const { data: res, isLoading } = useRngItemList();

  // 1초마다 1씩 감소 - 0이 될 경우 게임 종료 및 팝업창 표출
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

  useEffect(() => {
    if (!res?.data) return;

    setPlayItemList(getRandomItems(res.data, 50));
  }, [res]);

  if (isLoading || !res) return null;

  const onClickReset = () => {
    setIsStart(false);
    setPlayTime(DEFAULT_PLAY_TIME);
    setScore(0);
    setPlayItemList(getRandomItems(res?.data, 50));
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* 상단 고정 */}
      <RngItemNav
        playTime={playTime}
        score={score}
        onClickReset={onClickReset}
      />

      {/* 메인 영역 */}
      {/* Backpack + Pool 영역 */}
      <div className="flex justify-start gap-4 p-4 items-start">
        {/* 기준 높이 컨테이너 */}
        <div
          className="flex gap-4"
          style={{
            height: BACKPACK_HEIGHT * CELL_SIZE,
          }}
        >
          {/* Backpack */}
          <BackpackGrid
            dragState={dragState}
            placedItems={placedItems}
            setPlacedItems={setPlacedItems}
            setDragState={setDragState}
          />

          {/* Item Pool */}
          <ItemPool itemList={playItemList} setDragState={setDragState} />
        </div>
      </div>
    </div>
  );
}
