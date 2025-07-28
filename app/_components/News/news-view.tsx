"use client";

import type { NewsViewTypes } from "./NewsView.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { newsI18N } from "@/lib/consts/i18nConsts";
import RenderSection from "./render-section";

export default function NewsView({ news }: NewsViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {
          <RenderSection
            icon="⭐"
            title={newsI18N.recommendationFeature[localeKey]}
            items={news.json_value.recommend}
            sectionKey="recommend"
          />
        }
        {
          <RenderSection
            icon="🎯"
            title={newsI18N.event[localeKey]}
            items={news.json_value.event}
            sectionKey="event"
          />
        }
        {
          <RenderSection
            icon="📅"
            title={newsI18N.comingSoon[localeKey]}
            items={news.json_value.next_update}
            sectionKey="next-update"
          />
        }
        {
          <RenderSection
            icon="📋"
            title={newsI18N.patchNote[localeKey]}
            items={news.json_value.patch}
            sectionKey="patch"
          />
        }
        {
          <RenderSection
            icon="🎮"
            title={newsI18N.tarkovInfo[localeKey]}
            items={news.json_value.tarkov_info}
            sectionKey="tarkov-info"
          />
        }
      </div>
    </div>
  );
}
