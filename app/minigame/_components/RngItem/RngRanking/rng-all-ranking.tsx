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
import { Trophy } from "lucide-react";
import { RngAllRankTypes, RngRankDataTypes } from "../../minigame-types";
import { alertMessageI18N, minigameI18N } from "@/lib/consts/i18nConsts";
import { DialogHeader } from "@/components/ui/dialog";
import { rngItemRankIcon, rngItemRankStype } from "@/lib/func/jsxfunction";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { formatISODate } from "@/lib/func/formatTime";

export default function RngAllRanking({
  rankOpen,
  setRankOpen,
}: RngAllRankTypes) {
  const [rankList, setRankList] = useState<RngRankDataTypes[]>([]);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!rankOpen) return;

    const getAllRank = async () => {
      setIsLoading(true);
      const data = await fetch(API_ENDPOINTS.GET_ALL_RNG_ITEM_RANK);
      const result = await data.json();

      if (!result || result.status !== 200) {
        console.error("Failed to fetch data:", result?.msg || "Unknown error");
        setRankList([]);
      } else {
        setRankList(result.data);
      }
      setIsLoading(false);
    };

    getAllRank();
  }, [rankOpen]);

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

        <div className="bg-linear-to-br from-emerald-500 to-teal-600 px-6 py-8 text-white text-center">
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
          ) : rankList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6"
                />
              </svg>
              <p className="text-sm font-medium">No Rank</p>
            </div>
          ) : (
            <div className="space-y-2">
              {rankList.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-sm ${rngItemRankStype(player.rank)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      {rngItemRankIcon(player.rank)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {player.nickname}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatISODate(player.create_time)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${
                        player.rank <= 3 ? "text-emerald-600" : "text-gray-700"
                      }`}
                    >
                      {player.score.toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              ))}
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
