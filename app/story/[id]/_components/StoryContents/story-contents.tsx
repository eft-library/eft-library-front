/* eslint-disable @next/next/no-img-element */

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { StoryContentsTypes } from "../story-types";
import { storyI18N } from "@/lib/consts/i18nConsts";
import { useState, useCallback } from "react";
import StoryGuide from "./story-guide";
import ImageViewerDialog from "./image-viewer-dialog";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function StoryContents({ storyDetail }: StoryContentsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageClick = useCallback((src: string) => {
    setSelectedImage(src);
  }, []);

  return (
    <div className="space-y-6">
      {/* Prerequisites */}
      {storyDetail.requirements &&
        storyDetail.requirements[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <span className="text-primary dark:text-blue-400">{"🔑"}</span>
                <span>{storyI18N.prerequisites[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white">
                {storyI18N.unlockConditionDesc[localeKey]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none [&_p]:leading-relaxed [&_p]:text-foreground dark:[&_p]:text-white/65 [&_p]:mb-2 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{
                  __html: storyDetail.requirements[localeKey],
                }}
              />
            </CardContent>
          </Card>
        )}

      <AdBanner
        dataAdFormat={"auto"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
        maxWidth={1220}
      />
      {/* Objectives */}
      {storyDetail.objectives &&
        storyDetail.objectives[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <span className="text-primary dark:text-blue-400">{"🎯"}</span>
                <span>{storyI18N.objectives[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white">
                {storyI18N.objectivesDesc[localeKey]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_li]:text-foreground dark:[&_li]:text-white [&_ul_ul]:list-circle [&_ul_ul]:mt-2"
                dangerouslySetInnerHTML={{
                  __html: storyDetail.objectives[localeKey],
                }}
              />
            </CardContent>
          </Card>
        )}

      <AdBanner
        dataAdFormat={"auto"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
        maxWidth={1220}
      />
      {/* Guide */}
      {storyDetail.guide && storyDetail.guide[localeKey].length > 0 && (
        <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
              <span className="text-primary dark:text-blue-400">{"📖"}</span>
              <span>{storyI18N.guide[localeKey]}</span>
            </CardTitle>
            <CardDescription className="dark:text-white">
              {storyI18N.guideDesc[localeKey]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StoryGuide
              html={storyDetail.guide[localeKey]}
              onImageClick={handleImageClick}
            />

            <ImageViewerDialog
              src={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
