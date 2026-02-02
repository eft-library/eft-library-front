"use client";

import type { StoryViewTypes } from "./story-types";
import StoryContents from "./StoryContents/story-contents";
import StorySelector from "./StorySelector/story-selector";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { storyI18N } from "@/lib/consts/i18nConsts";

export default function StoryView({ story }: StoryViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-balance font-sans font-bold tracking-tight text-foreground text-5xl">
            {storyI18N.story[localeKey]}
          </h1>
        </div>

        <StorySelector selector={story.selector} />
        <StoryContents storyDetail={story.detail} />
      </div>
    </div>
  );
}
