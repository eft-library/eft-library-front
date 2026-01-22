"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Play } from "lucide-react";
import { RngStartOverlayTypes } from "../../minigame-types";
import { minigameI18N } from "@/lib/consts/i18nConsts";

export default function RngStartOverlay({
  onClickStart,
}: RngStartOverlayTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150" />

        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/95 dark:from-zinc-900/90 dark:to-zinc-950/90 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-10 shadow-2xl">
          <div className="text-center space-y-6">
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
              className="cursor-pointer group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{minigameI18N.startOverlay.button[localeKey]}</span>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
