"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { StoryContentsTypes } from "../story-types";
import HtmlWithImage from "@/components/custom/HtmlWithImg/html-with-img";
import { storyI18N } from "@/lib/consts/i18nConsts";

export default function StoryContents({ storyDetail }: StoryContentsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="space-y-6">
      {/* Prerequisites */}
      <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-gray-400 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
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
          <ul className="space-y-3">
            {storyDetail.requirements.map((requirement, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-foreground dark:text-white"
              >
                <Badge
                  variant="outline"
                  className="mt-0.5 shrink-0 border-primary/50 bg-primary/10 text-primary dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-400"
                >
                  {index + 1}
                </Badge>
                <span className="leading-relaxed font-semibold">
                  {requirement[localeKey]}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-gray-400  dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
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
          <ul className="space-y-3">
            {storyDetail.objectives.map((objective, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-foreground dark:text-white"
              >
                <Badge
                  variant="outline"
                  className="mt-0.5 shrink-0 border-primary/50 bg-primary/10 text-primary dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-400"
                >
                  {index + 1}
                </Badge>
                <span className="leading-relaxed font-semibold">
                  {objective[localeKey]}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Guide */}
      <Card className="border-border/50 shadow-xl dark:bg-white/[0.02] dark:border-gray-400  dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
            <span className="text-primary dark:text-blue-400">{"📖"}</span>
            <span className=" font-semibold">{storyI18N.guide[localeKey]}</span>
          </CardTitle>
          <CardDescription className="dark:text-white font-semibold">
            {storyI18N.guideDesc[localeKey]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <HtmlWithImage contents={storyDetail.guide[localeKey]} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
