"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { RotateCcw, Trophy } from "lucide-react";
import { RngEndOverlayTypes } from "../../minigame-types";
import { minigameI18N } from "@/lib/consts/i18nConsts";

export default function RngEndOverlay({
  score,
  onClickReset,
}: RngEndOverlayTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150" />

        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/95 dark:from-zinc-900/90 dark:to-zinc-950/90 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-10 shadow-2xl">
          <div className="text-center space-y-6">
            {/* Game Over Title */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 dark:from-rose-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
                {minigameI18N.gameOverOverlay.title[localeKey]}
              </h2>

              {score !== undefined && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-zinc-500 dark:text-zinc-500">
                    {minigameI18N.gameOverOverlay.finalScore[localeKey]}
                  </span>
                  <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {score.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent" />

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => onClickReset()}
                className="cursor-pointer group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                <span>
                  {minigameI18N.gameOverOverlay.buttons.restart[localeKey]}
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button
                onClick={() => onClickReset()}
                className="cursor-pointer group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <span>
                  {minigameI18N.gameOverOverlay.buttons.ranking[localeKey]}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
