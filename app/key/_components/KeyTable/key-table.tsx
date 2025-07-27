"use client";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import Link from "next/link";
import type { KeyTableTypes } from "../key.types";
import Highlighter from "react-highlight-words";

export default function KeyTable({ keyList, word }: KeyTableTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const filteredList = keyList.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="mb-6 border border-border rounded-xl dark:bg-gray-800/30 bg-white shadow-sm dark:shadow-lg">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.key.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.key.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.key.useMap[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.key.usageCount[localeKey]}
        </div>
      </div>

      {/* Items */}
      {filteredList.map((item) => (
        <div
          key={item.id}
          className="border-b border-border last:border-b-0 hover:bg-muted/30 dark:hover:bg-card-foreground/5 transition-all duration-200"
        >
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-4 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <div className="relative group">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={120}
                    height={120}
                    className="w-20 h-20 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
              <div className="col-span-1 text-sm font-semibold text-foreground">
                <Highlighter
                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                  searchWords={[word]}
                  autoEscape
                  textToHighlight={item.name[localeKey]}
                />
              </div>
              <div className="text-center font-normal text-foreground/80">
                <div className="flex flex-col items-center space-y-2">
                  {item.info.use_map.en &&
                    item.info.use_map[getLocaleKey(locale)].map(
                      (value, index) => (
                        <span
                          key={`use-map-${index}-${value}`}
                          className="px-3 py-1 rounded-full text-sm text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/50"
                        >
                          {value}
                        </span>
                      )
                    )}
                </div>
              </div>
              <div className="col-span-1 text-center font-semibold text-foreground/80">
                {item.info.uses}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-2 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground">
                    <Highlighter
                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                      searchWords={[word]}
                      autoEscape
                      textToHighlight={item.name[localeKey]}
                    />
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-3 text-muted-foreground">
                    {itemI18N.key.useMap[localeKey]}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.info.use_map.en &&
                      item.info.use_map[getLocaleKey(locale)].map(
                        (value, index) => (
                          <span
                            key={`use-map-${index}-${value}`}
                            className="px-3 py-1 rounded-full text-sm text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/50"
                          >
                            {value}
                          </span>
                        )
                      )}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                    {itemI18N.key.usageCount[localeKey]}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {item.info.uses}
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
