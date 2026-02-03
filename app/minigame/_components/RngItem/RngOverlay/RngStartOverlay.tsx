"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Play } from "lucide-react";
import { RngStartOverlayTypes } from "../../minigame-types";
import { minigameI18N } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import RngAllRanking from "../RngRanking/rng-all-ranking";

export default function RngStartOverlay({
  onClickStart,
}: RngStartOverlayTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [rankOpen, setRankOpen] = useState(false);

  return (
    <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/70 to-white/80 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />

        <div className=" relative w-[320px] max-w-[90vw] min-h-75 bg-linear-to-b ">
          <div className="text-center space-y-6 flex flex-col">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {minigameI18N.startOverlay.title[localeKey]}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {minigameI18N.startOverlay.description[localeKey]}
              </p>
            </div>

            <button
              onClick={() => onClickStart(true)}
              className="cursor-pointer group relative inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 hover:scale-105 active:scale-95 justify-center"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{minigameI18N.startOverlay.button[localeKey]}</span>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <RngAllRanking setRankOpen={setRankOpen} rankOpen={rankOpen} />
          </div>
        </div>
      </div>
    </div>
  );
}
