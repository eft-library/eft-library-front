"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { ArmBandListTypes } from "../arm-band.types";
import Image from "next/image";
import ItemTableHeader from "@/components/custom/itemTable/item-table-header";
import ItemTableRowWrapper from "@/components/custom/itemTable/item-table-row-wrapper";

export default function ArmBandTable({ armBandList }: ArmBandListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const columns = [
    { key: "photo", colSpan: 1, colText: itemI18N.armBand.photo[localeKey] },
    { key: "name", colSpan: 1, colText: itemI18N.armBand.name[localeKey] },
  ];
  return (
    <div className="hidden lg:block">
      <div
        className={`rounded-lg border overflow-hidden dark:bg-slate-800 border-slate-700 bg-white border-gray-200`}
      >
        {/* Table Header */}
        <ItemTableHeader gridColSpan={2} columns={columns} />

        {/* Table Rows */}
        {armBandList.map((item, index) => (
          <ItemTableRowWrapper
            urlMapping={item.url_mapping}
            dataIndex={index}
            dataLength={armBandList.length}
            key={item.id}
            gridCols={2}
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <div
                className={`w-20 h-20 rounded border flex items-center justify-center dark:bg-slate-600 dark:border-slate-500 bg-gray-100 border-gray-300`}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
            </div>

            {/* Name */}
            <div className="col-span-1 flex items-center">
              <span>{item.name[localeKey]}</span>
            </div>
          </ItemTableRowWrapper>
        ))}
      </div>
    </div>
  );
}
