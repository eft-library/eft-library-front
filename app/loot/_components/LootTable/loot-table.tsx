import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import type { LootTableTypes } from "../loot.types";
import Link from "next/link";
import Highlighter from "react-highlight-words";

export default function LootTable({ lootList, word }: LootTableTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const filteredList = lootList.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );
  return (
    <div className="mb-6 border border-border rounded-xl dark:bg-gray-800/30 bg-white shadow-sm dark:shadow-lg">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-2 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.armBand.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.armBand.name[localeKey]}
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
            scroll={false}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-2 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <div className="relative group">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={64}
                    height={64}
                    className="w-26 h-26 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
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
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-2">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50 border border-border">
                <div className="relative group flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={64}
                    height={64}
                    className="w-20 h-20 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex-1 min-w-0">
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
