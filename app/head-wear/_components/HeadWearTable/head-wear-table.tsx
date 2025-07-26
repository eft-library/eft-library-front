"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import Highlighter from "react-highlight-words";
import Link from "next/link";
import { HeadWearTableTypes } from "../head-wear.types";

export default function HeadWearTable({
  headWearData,
  word,
}: HeadWearTableTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const filteredClassList = headWearData.class_headwear.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );
  const filteredNoClassList = headWearData.no_class_headwear.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="mb-6 border border-border rounded-xl bg-background dark:bg-card shadow-sm dark:shadow-lg">
      {/* Desktop Header - Class Rigs */}
      <div className="hidden md:grid grid-cols-4 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.rig.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.rig.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.rig.armorClass[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.rig.durability[localeKey]}
        </div>
      </div>

      {/* Items - Class Rigs */}
      {filteredClassList.map((item) => (
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
                    className="w-34 h-30 object-contain rounded-lg border border-border bg-background group-hover:scale-105 transition-transform duration-200"
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
              <div className="col-span-1 text-center font-semibold text-foreground/80">
                {item.info.class_value}
              </div>
              <div className="col-span-1 text-center font-semibold text-foreground/80">
                {item.info.durability}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded-lg border border-border bg-background"
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
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                    {itemI18N.rig.armorClass[localeKey]}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {item.info.class_value}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-2 text-muted-foreground">
                    {itemI18N.rig.durability[localeKey]}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {item.info.durability}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Desktop Header - No Class Rigs (if any) */}
      {filteredNoClassList.length > 0 && (
        <div className="hidden md:grid grid-cols-2 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground">
          <div>{itemI18N.rig.photo[localeKey]}</div>
          <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
            {itemI18N.rig.name[localeKey]}
          </div>
        </div>
      )}

      {/* Items - No Class Rigs */}
      {filteredNoClassList.map((item) => (
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
            <div className="hidden md:grid grid-cols-2 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-34 h-30 object-contain rounded-lg border border-border bg-background"
                />
              </div>
              <div className="col-span-1 text-sm font-semibold text-foreground">
                <Highlighter
                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                  searchWords={[word]}
                  autoEscape
                  textToHighlight={item.name[localeKey]}
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain rounded-lg border border-border bg-background"
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
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
