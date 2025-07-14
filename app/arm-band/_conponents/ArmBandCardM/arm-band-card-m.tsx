"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Image from "next/image";
import ItemTableRowWrapperM from "@/components/custom/itemTable/item-table-row-wrapper-m";
import type { ArmBandListTypes } from "../arm-band.types";
import { itemI18N } from "@/lib/consts/i18nConsts";

export default function ArmBandCardM({ armBandList }: ArmBandListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="lg:hidden space-y-4">
      {armBandList.map((item) => (
        <ItemTableRowWrapperM key={item.id} urlMapping={item.url_mapping}>
          <div className="flex items-center space-x-4 mb-4 p-4">
            {/* 이미지 */}
            <div
              className={`bg-gray-100 border-gray-300 dark:bg-slate-600 dark:border-slate-500 w-18 h-18 rounded border flex items-center justify-center flex-shrink-0`}
            >
              <Image
                src={item.image || "/placeholder.svg?height=40&width=40"}
                alt={item.name.en}
                width={40}
                height={40}
                className="w-14 h-14 object-cover rounded"
              />
            </div>

            {/* 이름들 - 왼쪽에 붙이고 약간의 간격으로 배치 */}
            <div className="flex items-center gap-8 min-w-0">
              {/* 첫 번째 이름 - 왼쪽에 붙임 */}
              <h3 className="font-semibold text-lg break-words">
                {itemI18N.armBand.name[localeKey]}
              </h3>

              {/* 두 번째 이름 - 약간의 간격 */}
              <h3 className="font-semibold text-lg break-words text-gray-600 dark:text-gray-300">
                {item.name[localeKey]}
              </h3>
            </div>
          </div>
        </ItemTableRowWrapperM>
      ))}
    </div>
  );
}
