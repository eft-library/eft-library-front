"use client";

import { BossViewTypes } from "./[id]/_components/boss.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { boss18N } from "@/lib/consts/i18nConsts";

export default function BossView({ bossData }: BossViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        {boss18N.title[localeKey]}
      </h1>
    </div>
  );
}
