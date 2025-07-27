import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { CraftingUnlockTypes } from "../item.types";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Link from "next/link";

export default function CraftingUnlock({ itemInfo }: CraftingUnlockTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.questCraftUnlock[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.quest[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.production[localeKey]}
          </span>
        </div>

        <div className="space-y-3">
          {itemInfo.rewarded_by_quests_craft_unlock.map((unlock) => (
            <Link
              key={`required_by_quest_item-${unlock.reward.item.id}`}
              href={`/quest/detail/${unlock.url_mapping}`}
              target="_blank"
            >
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-20 h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Image
                      src={unlock.npc_image}
                      alt={unlock.npc_name.en}
                      width={48}
                      height={48}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  </div>
                  <span className="font-medium text-base text-foreground">
                    {unlock.name[localeKey]}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto flex-nowrap">
                  <div className="w-20 h-20 rounded-mdflex items-center justify-center flex-shrink-0">
                    <Image
                      src={unlock.reward.item.gridImageLink}
                      alt={unlock.reward.item.name_en}
                      width={40}
                      height={40}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground flex-grow-0">
                    {unlock.reward.item[getOtherLocalizedKey(localeKey)]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
