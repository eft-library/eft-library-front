"use client";
import type { MedicalItemTypes } from "../medical.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import Link from "next/link";
import Highlighter from "react-highlight-words";

export default function MedicalItem({ medicalList, word }: MedicalItemTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const filteredList = medicalList.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );
  return (
    <div className="mb-6 border border-border rounded-xl bg-background dark:bg-card shadow-sm dark:shadow-lg">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-5 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.medical.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.buff[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.usageCount[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.duration[localeKey]}
        </div>
      </div>
      {/* Items */}
      {filteredList.map((item) => (
        <div
          key={item.id}
          className="border-b border-border last:border-b-0 hover:bg-muted/30 dark:hover:bg-card-foreground/5 transition-all duration-200"
        >
          <Link href={`/item/${item.url_mapping}`} target="_blank">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 items-center">
              <div className="flex justify-center">
                <div className="relative group">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={120}
                    height={120}
                    className="w-20 h-20 object-contain rounded-lg border border-border bg-background group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
              <div className="text-sm font-semibold text-foreground">
                <Highlighter
                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                  searchWords={[word]}
                  autoEscape
                  textToHighlight={item.name[localeKey]}
                />
              </div>
              <div className="text-sm space-y-1 text-foreground/80">
                {item.info.cures &&
                  item.info.cures[localeKey] &&
                  item.info.cures[localeKey].length > 0 &&
                  item.info.cures[localeKey].map((buff, index) => (
                    <div
                      key={`${item.id}-cures-${index}`}
                      className="text-primary"
                    >
                      {buff}
                    </div>
                  ))}
              </div>
              <div className="text-center font-semibold text-sm text-foreground">
                {item.info.uses}
              </div>
              <div className="text-center font-semibold text-sm text-foreground">
                {item.info.use_time} {itemI18N.medical.sec[localeKey]}
              </div>
            </div>
            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-border">
                <Image
                  src={item.image || "/placeholder.svg?height=64&width=64"}
                  alt={item.name.en}
                  width={64}
                  height={64}
                  className="w-20 h-20 object-cover rounded-lg border border-border bg-background flex-shrink-0"
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
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                    {itemI18N.medical.buff[localeKey]}
                  </div>
                  <div className="space-y-1">
                    {item.info.cures &&
                      item.info.cures[localeKey] &&
                      item.info.cures[localeKey].length > 0 &&
                      item.info.cures[localeKey].map((buff, index) => (
                        <div
                          key={`${item.id}-cures-${index}`}
                          className="text-sm text-primary"
                        >
                          • {buff}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                      {itemI18N.medical.usageCount[localeKey]}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {item.info.uses}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                      {itemI18N.medical.duration[localeKey]}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
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
