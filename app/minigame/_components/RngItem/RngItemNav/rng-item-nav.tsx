"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Coins, RotateCcw } from "lucide-react";
import { MinigameNavTypes } from "../../minigame-types";
import { Button } from "@/components/ui/button";
import { DEFAULT_PLAY_TIME } from "@/lib/consts/libraryConsts";
import { minigameI18N } from "@/lib/consts/i18nConsts";

export default function RngItemNav({
  score,
  playTime,
  onClickReset,
}: MinigameNavTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const formatScore = (num: number) => {
    return num.toLocaleString("ko-KR");
  };
  const isLowTime = playTime <= 5;
  const progress = (playTime / DEFAULT_PLAY_TIME) * 100;

  return (
    <div className="relative flex items-center gap-6 px-6 py-4 bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* 배경 글로우 효과 */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* 점수 영역 */}
      <div className="relative flex items-center gap-3 min-w-40">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/20">
          <Coins className="w-5 h-5 text-accent" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Score
          </span>
          <span className="font-mono font-bold text-xl text-foreground tabular-nums">
            {formatScore(score)}&nbsp;₽
          </span>
        </div>
      </div>

      {/* 타이머 프로그레스 바 */}
      <div className="relative flex-1 flex items-center gap-4">
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-linear ${
              isLowTime
                ? "bg-linear-to-r from-destructive to-destructive/80 animate-pulse"
                : "bg-linear-to-r from-primary to-primary/80"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          className={`flex items-center justify-center min-w-16 px-3 py-1.5 rounded-lg font-mono text-sm font-bold tabular-nums ${
            isLowTime
              ? "bg-destructive/20 text-destructive"
              : "bg-primary/20 text-primary"
          }`}
        >
          {playTime}s
        </div>
      </div>

      {/* 초기화 버튼 */}
      <Button
        variant="outline"
        size="sm"
        onClick={onClickReset}
        className="relative gap-2 px-4 py-2 bg-transparent border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer"
      >
        <RotateCcw className="h-4 w-4" />
        <span className="font-medium pointer-events-none">
          {minigameI18N.reset[localeKey]}
        </span>
      </Button>
    </div>
  );
}
