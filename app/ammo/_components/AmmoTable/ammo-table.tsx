"use client";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { AmmoTableTypes } from "../ammo.types";
import Image from "next/image";
import { getEffectivenessColor } from "@/lib/func/jsxfunction";
import Link from "next/link";
import Highlighter from "react-highlight-words";

export default function AmmoTable({ ammoList, word }: AmmoTableTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const filteredList = ammoList.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="mb-6 border border-border rounded-xl bg-background dark:bg-card shadow-sm dark:shadow-lg">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.ammo.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.ammo.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.ammo.damage[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.ammo.penetration[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer col-span-2 hover:text-primary transition-colors">
          {itemI18N.ammo.armorEffectiveness[localeKey]}
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
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
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
              <div className="col-span-1 text-sm font-semibold text-foreground">
                <Highlighter
                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                  searchWords={[word]}
                  autoEscape
                  textToHighlight={item.name[localeKey]}
                />
              </div>
              <div className="col-span-1 text-center font-semibold text-foreground/80">
                {item.info.damage}
              </div>
              <div className="col-span-1 text-center font-semibold text-foreground/80">
                {item.info.penetration_power}
              </div>
              <div className="col-span-2 flex items-center justify-center gap-2 text-center font-normal">
                {item.info.efficiency &&
                  item.info.efficiency.map((value, idx) => (
                    <div
                      key={`ammo-efficiency-${idx}`}
                      className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm font-bold shadow-sm hover:scale-110 transition-transform duration-200 ${getEffectivenessColor(
                        value
                      )}`}
                    >
                      {value}
                    </div>
                  ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name.en}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain rounded-lg border border-border bg-background group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-2 text-foreground">
                    <Highlighter
                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                      searchWords={[word]}
                      autoEscape
                      textToHighlight={item.name[localeKey]}
                    />
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-1 text-muted-foreground">
                    {itemI18N.ammo.damage[localeKey]}
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {item.info.damage}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="font-semibold text-xs uppercase tracking-wide mb-1 text-muted-foreground">
                    {itemI18N.ammo.penetration[localeKey]}
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {item.info.penetration_power}
                  </div>
                </div>
              </div>

              {item.info.efficiency && item.info.efficiency.length > 0 && (
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-muted-foreground font-semibold text-xs uppercase tracking-wide mb-3">
                    {itemI18N.ammo.armorEffectiveness[localeKey]}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.info.efficiency.map((value, idx) => (
                      <div
                        key={`mobile-ammo-efficiency-${idx}`}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-bold shadow-sm hover:scale-110 transition-transform duration-200 ${getEffectivenessColor(
                          value
                        )}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
