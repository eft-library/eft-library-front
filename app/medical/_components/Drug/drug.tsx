"use client";

import type { DrugTypes } from "../medical.types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Link from "next/link";

export default function Drug({ medicalList }: DrugTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="mb-6 border rounded-lg border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900/50">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-gray-900 font-semibold text-center dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
        <div>{itemI18N.medical.photo[localeKey]}</div>
        <div>{itemI18N.medical.name[localeKey]}</div>
        <div>{itemI18N.medical.buff[localeKey]}</div>
        <div>{itemI18N.medical.debuff[localeKey]}</div>
        <div>{itemI18N.medical.usageCount[localeKey]}</div>
        <div>{itemI18N.medical.duration[localeKey]}</div>
      </div>

      {/* Items */}
      {medicalList.map((item) => (
        <div
          key={item.id}
          className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <Link href={`/item/${item.url_mapping}`} target="_blank">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 items-center text-center">
              <div className="flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.name[localeKey]}
              </div>
              <div className="text-sm space-y-1">
                <div className="dark:text-yellow-200 text-yellow-400">
                  {item.info.painkiller_duration}&nbsp;
                  {itemI18N.medical.duration_delay[localeKey]}
                </div>
                <div className="text-cyan-400">
                  {itemI18N.medical.painKiller[localeKey]}
                </div>
                {item.info.hydration_impact > 0 && (
                  <div className="text-cyan-400">
                    {itemI18N.medical.hydration[localeKey]}:&nbsp;
                    {item.info.hydration_impact}
                  </div>
                )}
                {item.info.energy_impact > 0 && (
                  <div className="text-cyan-400">
                    {itemI18N.medical.energy[localeKey]}:&nbsp;
                    {item.info.energy_impact}
                  </div>
                )}
              </div>
              <div className="text-sm space-y-1">
                {item.info.hydration_impact < 0 && (
                  <div className="text-red-400">
                    {itemI18N.medical.hydration[localeKey]}:&nbsp;
                    {item.info.hydration_impact}
                  </div>
                )}
                {item.info.energy_impact < 0 && (
                  <div className="text-red-400">
                    {itemI18N.medical.energy[localeKey]}:&nbsp;
                    {item.info.energy_impact}
                  </div>
                )}
              </div>
              <div className="text-center font-semibold text-sm text-gray-900 dark:text-gray-100">
                {item.info.uses}
              </div>
              <div className="text-center font-semibold text-sm text-gray-900 dark:text-gray-100">
                {item.info.use_time} {itemI18N.medical.sec[localeKey]}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-gray-600">
                <Image
                  src={item.image || "/placeholder.svg?height=64&width=64"}
                  alt={item.name.en}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600 flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-base text-gray-900 dark:text-gray-100">
                    {item.name[localeKey]}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-gray-600 dark:text-gray-300">
                    {itemI18N.medical.buff[localeKey]}
                  </div>
                  <div className="space-y-1">
                    <div className="dark:text-yellow-200 text-yellow-400 text-sm">
                      •&nbsp;{item.info.painkiller_duration}&nbsp;
                      {itemI18N.medical.duration_delay[localeKey]}
                    </div>
                    <div className="text-cyan-400 text-sm">
                      •&nbsp;{itemI18N.medical.painKiller[localeKey]}
                    </div>
                    {item.info.hydration_impact > 0 && (
                      <div className="text-cyan-400 text-sm">
                        •&nbsp;{itemI18N.medical.hydration[localeKey]}:&nbsp;
                        {item.info.hydration_impact}
                      </div>
                    )}
                    {item.info.energy_impact > 0 && (
                      <div className="text-cyan-400 text-sm">
                        •&nbsp;{itemI18N.medical.energy[localeKey]}:&nbsp;
                        {item.info.energy_impact}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-gray-600 dark:text-gray-300">
                    {itemI18N.medical.debuff[localeKey]}
                  </div>
                  <div className="space-y-1">
                    {item.info.hydration_impact < 0 && (
                      <div className="text-red-400 text-sm">
                        • {itemI18N.medical.hydration[localeKey]}:&nbsp;
                        {item.info.hydration_impact}
                      </div>
                    )}
                    {item.info.energy_impact < 0 && (
                      <div className="text-red-400 text-sm">
                        • {itemI18N.medical.energy[localeKey]}:&nbsp;
                        {item.info.energy_impact}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-gray-600 dark:text-gray-300">
                      {itemI18N.medical.usageCount[localeKey]}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.info.uses}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-gray-600 dark:text-gray-300">
                      {itemI18N.medical.duration[localeKey]}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {item.info.use_time} {itemI18N.medical.sec[localeKey]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
