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

export default function StoryContents({ storyDetail }: StoryContentsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="space-y-6">
      {/* Prerequisites */}
      {storyDetail.requirements &&
        storyDetail.requirements[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white/85">
                <span className="text-primary dark:text-blue-400/70">
                  {"🔑"}
                </span>
                <span>{storyI18N.prerequisites[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white/45">
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

      {/* Objectives */}
      {storyDetail.objectives &&
        storyDetail.objectives[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white/85">
                <span className="text-primary dark:text-blue-400/70">
                  {"🎯"}
                </span>
                <span>{storyI18N.objectives[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white/45">
                {storyI18N.objectivesDesc[localeKey]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_li]:text-foreground dark:[&_li]:text-white/65 [&_ul_ul]:list-circle [&_ul_ul]:mt-2"
                dangerouslySetInnerHTML={{
                  __html: storyDetail.objectives[localeKey],
                }}
              />
            </CardContent>
          </Card>
        )}

      {/* Guide */}
      {storyDetail.guide && storyDetail.guide[localeKey].length > 0 && (
        <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl dark:text-white/85">
              <span className="text-primary dark:text-blue-400/70">{"📖"}</span>
              <span>{storyI18N.guide[localeKey]}</span>
            </CardTitle>
            <CardDescription className="dark:text-white/45">
              {storyI18N.guideDesc[localeKey]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm dark:prose-invert max-w-none [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:mt-8 [&_h3:first-child]:mt-0 [&_h3]:text-foreground dark:[&_h3]:text-white/90 [&_p]:leading-relaxed [&_p]:text-foreground dark:[&_p]:text-white/65 [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-border [&_th]:bg-muted/70 [&_th]:p-3 [&_th]:text-center [&_th]:align-middle [&_th]:font-semibold dark:[&_th]:border-white/10 dark:[&_th]:bg-white/10 [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-center [&_td]:align-middle dark:[&_td]:border-white/10 [&_td_img]:inline-block [&_td_img]:h-12 [&_td_img]:w-12 [&_td_img]:mx-auto"
              dangerouslySetInnerHTML={{
                __html: storyDetail.guide[localeKey],
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
