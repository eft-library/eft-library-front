"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Image from "next/image";
import ItemTableRowWrapperM from "@/components/custom/itemTable/item-table-row-wrapper-m";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { ArmorVestListTypes } from "../armor-vest.types";
import { Card, CardContent } from "@/components/ui/card";

export default function ArmorVestCardM({ armorVestList }: ArmorVestListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="lg:hidden space-y-4">
      {armorVestList.map((item) => (
        <ItemTableRowWrapperM key={item.id} urlMapping={item.url_mapping}>
          <div className="w-full max-w-2xl mx-auto p-4">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* 이미지 섹션 */}
                  <div className="flex-shrink-0">
                    <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=80&width=80"
                        }
                        alt={item.name.en}
                        width={80}
                        height={80}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                  </div>

                  {/* 정보 섹션 */}
                  <div className="flex-1 space-y-4">
                    {/* 아이템 이름 */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {itemI18N.armBand.name[localeKey]}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground break-words">
                        {item.name[localeKey]}
                      </h3>
                    </div>

                    {/* 아이템 속성들 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 내구도 */}
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {itemI18N.armorVest.durability[localeKey]}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">
                            {item.info.durability}
                          </span>
                        </div>
                      </div>

                      {/* 방어 등급 */}
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {itemI18N.armorVest.armorClass[localeKey]}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">
                            {item.info.class_value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ItemTableRowWrapperM>
      ))}
    </div>
  );
}
