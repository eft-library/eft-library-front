"use client";

import { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import HtmlWithImage from "@/components/custom/html-with-img";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Link from "next/link";

export default function QuestGuide({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2">
              가이드
            </h2>
            <HtmlWithImage contents={quest.guide[localeKey]} />
          </div>
          <Link target="_blank" href={quest.wiki_url}>
            <Button
              variant="outline"
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 bg-transparent shrink-0 text-sm sm:text-base"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Wiki Quest Page
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
