"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Check, RotateCcw, Send } from "lucide-react";
import { RngEndOverlayTypes } from "../../minigame-types";
import { minigameI18N } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RngRanking from "../RngRanking/rng-ranking";

export default function RngEndOverlay({
  score,
  onClickReset,
}: RngEndOverlayTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rankOpen, setRankOpen] = useState(false);

  const handleSubmit = async () => {
    if (!nickname.trim() || score === undefined) return;

    setIsSubmitting(true);
    try {
      const data = await requestPostData(API_ENDPOINTS.SAVE_RNG_ITEM_SCORE, {
        nickname: nickname.trim(),
        score: score,
        game_type: "RNG-ITEM",
      });

      if (!data || data.status !== 200)
        throw new Error(data?.msg || "Failed to fetch score data");

      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/70 to-white/80 dark:from-black/70 dark:via-black/60 dark:to-black/70 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150" />

        <div className="relative bg-linear-to-b from-white/95 to-zinc-50/95 dark:from-zinc-900/90 dark:to-zinc-950/90 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl p-10 shadow-2xl min-w-[320px]">
          <div className="text-center space-y-6">
            {/* Game Over Title */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-linear-to-r from-rose-500 via-pink-500 to-rose-500 dark:from-rose-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
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
            <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent" />

            {/* Nickname Input Section */}
            {score !== undefined && (
              <div className="space-y-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {minigameI18N.gameOverOverlay.nickname.placeholder[localeKey]}
                </p>

                {!isSubmitted ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Nickname"
                      maxLength={12}
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all disabled:opacity-50"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && nickname.trim()) {
                          handleSubmit();
                        }
                      }}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={!nickname.trim() || isSubmitting}
                      className="px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {minigameI18N.gameOverOverlay.nickname.success[localeKey]}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Divider */}
            {score !== undefined && (
              <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-300 dark:via-zinc-600 to-transparent" />
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => onClickReset()}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
                <span>
                  {minigameI18N.gameOverOverlay.buttons.restart[localeKey]}
                </span>

                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <RngRanking
                rankOpen={rankOpen}
                setRankOpen={setRankOpen}
                score={score}
                nickname={nickname}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
