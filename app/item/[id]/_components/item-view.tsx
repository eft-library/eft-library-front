"use client";

import type { ItemViewTypes } from "./item.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import QuestRequire from "./QuestRequire/quest-require";
import TraderExchange from "./TraderExchange/trader-exchange";
import HideoutCrafting from "./HideoutCrafting/hideout-crafting";
import QuestReward from "./QuestReward/quest-reward";
import HideoutConstruction from "./HideoutConstruction/hideout-construction";
import PurchaseUnlock from "./PurchaseUnlock/purchase-unlock";
import CraftingUnlock from "./CraftingUnlock/crafting-unlock";
import MedikitDetail from "./ItemDetail/medikit-detail";
import DrugDetail from "./ItemDetail/drug-detail";
import MedicalItemDetail from "./ItemDetail/medical-item-detail";
import StimulantDetail from "./ItemDetail/stimulant-detail";

export default function ItemView({ itemInfo }: ItemViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black">
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-xl md:text-4xl font-bold">
              {itemInfo.name[localeKey]}
            </h1>
          </div>
        </div>
        {itemInfo.category === "Medical" &&
          itemInfo.info.medical_category === "Medikit" && (
            <MedikitDetail itemInfo={itemInfo} />
          )}

        {itemInfo.category === "Medical" &&
          itemInfo.info.medical_category === "Drug" && (
            <DrugDetail itemInfo={itemInfo} />
          )}
        {itemInfo.category === "Medical" &&
          itemInfo.info.medical_category === "Medical item" && (
            <MedicalItemDetail itemInfo={itemInfo} />
          )}
        {itemInfo.category === "Medical" &&
          itemInfo.info.medical_category === "Stimulant" && (
            <StimulantDetail itemInfo={itemInfo} />
          )}

        {(itemInfo.required_by_quest_item.length > 0 ||
          itemInfo.required_by_quest_item_array.length > 0) && (
          <QuestRequire itemInfo={itemInfo} />
        )}
        {itemInfo.rewarded_by_npcs.length > 0 && (
          <TraderExchange itemInfo={itemInfo} />
        )}
        {itemInfo.used_in_crafts.length > 0 && (
          <HideoutCrafting itemInfo={itemInfo} />
        )}
        {itemInfo.rewarded_by_quests.length > 0 && (
          <QuestReward itemInfo={itemInfo} />
        )}
        {itemInfo.hideout_items.length > 0 && (
          <HideoutConstruction itemInfo={itemInfo} />
        )}
        {itemInfo.rewarded_by_quests_offer_unlock.length > 0 && (
          <PurchaseUnlock itemInfo={itemInfo} />
        )}
        {itemInfo.rewarded_by_quests_craft_unlock.length > 0 && (
          <CraftingUnlock itemInfo={itemInfo} />
        )}
      </div>
    </div>
  );
}
