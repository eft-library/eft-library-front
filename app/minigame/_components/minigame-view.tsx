"use client";
import { useState } from "react";
import MinigameTab from "./MinigameTab/minigame-tab";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";
import { minigameI18N } from "@/lib/consts/i18nConsts";
import RngItem from "./RngItem/rng-item";
import RngHelp from "./RngItem/RngHelp/rng-help";

export default function MinigameView() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [tabState, setTabState] = useState<string>("RNG-ITEM");

  return (
    <ViewWrapper>
      <div
        className={`min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black`}
      >
        {/* Header */}
        <div className="backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-4 items-center justify-center">
              {/* 제목 */}
              <h1 className="text-3xl font-bold dark:text-white text-gray-900">
                {minigameI18N.title[localeKey]}
              </h1>

              {/* 광고 (세로 유지) */}
              <AdBanner
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                dataAdSlot="2690838054"
                maxWidth={1220}
              />

              {/* 탭 + Help (여기만 가로) */}
              <div className="flex items-center gap-3">
                <MinigameTab tabState={tabState} setTabState={setTabState} />
                <RngHelp />
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          {tabState === "RNG-ITEM" && <RngItem />}
        </div>
      </div>
    </ViewWrapper>
  );
}
