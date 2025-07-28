import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { BossDetail } from "../boss.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { boss18N } from "@/lib/consts/i18nConsts";
import HtmlWithImage from "@/components/custom/HtmlWithImg/html-with-img";

export default function BossLocation({ bossData }: BossDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="w-full dark:bg-gray-800/30 dark:border-gray-700/50 bg-white border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl">
          {boss18N.location[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bossData.boss.location_guide &&
          bossData.boss.location_guide[localeKey] && (
            <HtmlWithImage contents={bossData.boss.location_guide[localeKey]} />
          )}
      </CardContent>
    </Card>
  );
}
