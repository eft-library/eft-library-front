"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Trophy, TrendingUp } from "lucide-react";
import { RngRankDataTypes, RngRankTypes } from "../../minigame-types";
import { alertMessageI18N, minigameI18N } from "@/lib/consts/i18nConsts";
import { DialogHeader } from "@/components/ui/dialog";
import {
  ordinalEn,
  rngItemRankIcon,
  rngItemRankStype,
} from "@/lib/func/jsxfunction";
import { useEffect, useState } from "react";
import { formatISODate } from "@/lib/func/formatTime";
import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default function RngRanking({
  rankOpen,
  setRankOpen,
  score,
  nickname,
}: RngRankTypes) {
  const [rankList, setRankList] = useState<RngRankDataTypes[]>([]);
  const [myRank, setMyRank] = useState<number>(0);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!rankOpen) return;

    const fetchAndBuildRank = async () => {
      setIsLoading(true);

      try {
        const res = await requestPostData(API_ENDPOINTS.GET_MY_RNG_ITEM_RANK, {
          score,
        });

        let list: RngRankDataTypes[] = [];

        if (!res || res.status !== 200 || !res.data) {
          // 실패 시도 빈 배열
          list = [];
        } else {
          list = res.data;
        }

        // 이미 같은 score 가 있으면 그대로 사용
        const alreadyExist = list.find(
          (item) => item.score === score && item.nickname === nickname,
        );

        if (alreadyExist) {
          setRankList(list);
          setMyRank(alreadyExist.rank);
          return;
        }

        // 들어갈 위치 계산
        const insertIndex = list.findIndex((item) => item.score < score);

        // 빈 리스트면 본인이 1등
        const myRankValue =
          list.length === 0
            ? 1
            : insertIndex === -1
              ? list[list.length - 1].rank + 1
              : list[insertIndex].rank;

        const myRankItem: RngRankDataTypes = {
          nickname,
          rank: myRankValue,
          score,
          create_time: new Date().toISOString(),
        };

        // 순서 유지하면서 끼워 넣기
        const newList =
          list.length === 0
            ? [myRankItem] // 빈 리스트 → 본인 1등
            : insertIndex === -1
              ? [...list, myRankItem]
              : [
                  ...list.slice(0, insertIndex),
                  myRankItem,
                  ...list.slice(insertIndex).map((item) => ({
                    ...item,
                    rank: item.rank + 1,
                  })),
                ];

        setRankList(newList);
        setMyRank(myRankValue);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndBuildRank();
  }, [rankOpen, score, nickname]);

  return (
    <Dialog open={rankOpen} onOpenChange={setRankOpen}>
      <DialogTrigger asChild>
        <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 active:scale-95">
          <Trophy className="w-5 h-5 mr-2 text-amber-500" />
          {minigameI18N.gameOverOverlay.buttons.ranking[localeKey]}
        </button>
      </DialogTrigger>
      <DialogContent className=" fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-md w-full max-h-[90vh] p-0 overflow-hidden border-0 bg-white rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 ">
        {/* Header */}

        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-8 text-white text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {minigameI18N.ranking[localeKey]}
          </h2>
          <p className="text-emerald-100 text-sm">
            {minigameI18N.rngItem[localeKey]} TOP 10
          </p>
        </div>

        {/* My Rank */}
        <div className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-medium">
                  {minigameI18N.myRank[localeKey]}
                </p>
                <p className="font-bold text-gray-800">{ordinalEn(myRank)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                {minigameI18N.myScore[localeKey]}
              </p>
              <p className="font-bold text-emerald-600">
                {score.toLocaleString()} ₽
              </p>
            </div>
          </div>
        </div>

        {/* Ranking List */}
        <div className="px-4 py-3 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {rankList.map((player) => {
                const isMyRank = player.rank === myRank;

                return (
                  <div
                    key={player.rank}
                    className={`
                        flex items-center justify-between p-3 rounded-xl border transition-all
                        hover:shadow-sm
                        ${rngItemRankStype(player.rank)}
                        ${isMyRank ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center`}
                      >
                        {rngItemRankIcon(player.rank)}
                      </div>

                      <div>
                        <p
                          className={`font-semibold text-sm ${
                            isMyRank ? "text-emerald-700" : "text-gray-800"
                          }`}
                        >
                          {player.nickname.length > 0
                            ? player.nickname
                            : "unknown"}
                          {isMyRank && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold">
                              ME
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatISODate(player.create_time)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-bold text-sm ${
                          isMyRank
                            ? "text-emerald-700"
                            : player.rank <= 3
                              ? "text-emerald-600"
                              : "text-gray-700"
                        }`}
                      >
                        {player.score.toLocaleString()} ₽
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t">
          <Button
            onClick={() => setRankOpen(false)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-5 rounded-xl"
          >
            {alertMessageI18N.close[localeKey]}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
