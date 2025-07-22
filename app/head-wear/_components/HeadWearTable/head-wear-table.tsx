"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { HeadWearListTypes } from "../head-wear.types";

export default function HeadWearTable({ headWearData }: HeadWearListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div
      className={`mb-6 border rounded-lg ${
        theme === "dark"
          ? "border-gray-600 bg-gray-800"
          : "border-gray-300 bg-white"
      }`}
    >
      {/* Desktop Header */}
      <div
        className={`hidden md:grid grid-cols-4 gap-4 p-4 border-b font-semibold text-center ${
          theme === "dark"
            ? "border-gray-600 bg-gray-750 text-white"
            : "border-gray-200 bg-gray-50 text-black"
        }`}
      >
        <div>{itemI18N.headWear.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.headWear.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.headWear.armorClass[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.headWear.durability[localeKey]}
        </div>
      </div>

      {/* Items */}
      {headWearData.class_headwear.map((item) => (
        <div
          key={item.id}
          className={`border-b last:border-b-0 ${
            theme === "dark"
              ? "border-gray-700 hover:bg-gray-750"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded border border-gray-600"
                />
              </div>
              <div
                className={`col-span-1 text-sm font-medium text-center ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.name[localeKey]}
              </div>
              <div
                className={`col-span-1 text-center font-normal ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.info.class_value}
              </div>
              <div
                className={`col-span-1 text-center font-normal ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.info.durability}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-gray-600">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded border border-gray-600"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium text-base ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name[localeKey]}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.headWear.armorClass[localeKey]}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.info.class_value}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.headWear.durability[localeKey]}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.info.durability}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <div
        className={`hidden md:grid grid-cols-2 gap-4 p-4 border-b font-semibold text-center ${
          theme === "dark"
            ? "border-gray-600 bg-gray-750 text-white"
            : "border-gray-200 bg-gray-50 text-black"
        }`}
      >
        <div>{itemI18N.headWear.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.headWear.name[localeKey]}
        </div>
      </div>
      {headWearData.no_class_headwear.map((item) => (
        <div
          key={item.id}
          className={`border-b last:border-b-0 ${
            theme === "dark"
              ? "border-gray-700 hover:bg-gray-750"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-2 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded border border-gray-600"
                />
              </div>
              <div
                className={`col-span-1 text-sm font-medium text-center ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.name[localeKey]}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-gray-600">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded border border-gray-600"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium text-base ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name[localeKey]}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
