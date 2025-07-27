import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import Image from "next/image";
import { QuestRequireTypes } from "../item.types";
import Link from "next/link";

export default function QuestRequire({ itemInfo }: QuestRequireTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.questRequired[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.quest[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.material[localeKey]}
          </span>
        </div>

        <div className="space-y-3">
          {itemInfo.required_by_quest_item.length > 0 &&
            itemInfo.required_by_quest_item.map((questItem) => (
              <Link
                key={`required_by_quest_item-${questItem.objective.id}`}
                href={`/quest/detail/${questItem.url_mapping}`}
                target="_blank"
              >
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={questItem.npc_image}
                        alt={questItem.npc_name.en}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="font-medium text-base text-foreground">
                      {questItem.name[localeKey]}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto flex-nowrap">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                      <Image
                        src={questItem.objective.questItem.gridImageLink}
                        alt={questItem.objective.questItem.name_en}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-sm font-medium dark:text-white text-dark flex-grow-0">
                      {
                        questItem.objective.questItem[
                          getOtherLocalizedKey(localeKey)
                        ]
                      }
                    </span>
                    <span className="text-sm font-semibold text-primary flex-shrink-0">
                      {questItem.objective.count}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          {itemInfo.required_by_quest_item_array.length > 0 &&
            itemInfo.required_by_quest_item_array.map((questItem) => (
              <Link
                key={`required_by_quest_item-${questItem.objective.id}`}
                href={`/quest/detail/${questItem.url_mapping}`}
                target="_blank"
              >
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={questItem.npc_image}
                        alt={questItem.npc_name.en}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="font-medium text-base text-foreground">
                      {questItem.name[localeKey]}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2 sm:mt-0  w-full sm:w-auto flex-nowrap">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                      <Image
                        src={
                          questItem.objective.items.find(
                            (qItem) => qItem.id === itemInfo.id
                          )?.gridImageLink || ""
                        }
                        alt={
                          questItem.objective.items.find(
                            (qItem) => qItem.id === itemInfo.id
                          )?.name_en || ""
                        }
                        width={80}
                        height={80}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-sm font-medium dark:text-white text-dark flex-grow-0">
                      {
                        questItem.objective.items.find(
                          (qItem) => qItem.id === itemInfo.id
                        )?.name_en
                      }
                    </span>
                    <span className="text-sm font-semibold text-primary flex-shrink-0">
                      {questItem.objective.count}
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
