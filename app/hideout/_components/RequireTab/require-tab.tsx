import {
  ItemRequire,
  RequireTabTypes,
  SkillRequire,
  TraderRequire,
} from "../hideout.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Image from "next/image";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { CheckCircle } from "lucide-react";

export default function RequireTab({ items, type }: RequireTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const isItemRequire = (
    item: ItemRequire | SkillRequire | TraderRequire
  ): item is ItemRequire => "quantity" in item;
  const isSkillRequire = (
    item: ItemRequire | SkillRequire | TraderRequire
  ): item is SkillRequire => "level" in item;
  const isTraderRequire = (
    item: ItemRequire | SkillRequire | TraderRequire
  ): item is TraderRequire => "value" in item;

  const checkType = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "item" && isItemRequire(item)) {
      return `x ${item.quantity}`;
    } else if (type === "trader" && isTraderRequire(item)) {
      return `LV ${item.value || ""}`;
    } else if (type === "skill" && isSkillRequire(item)) {
      return `${item.name[localeKey]} ${item.level || ""}`;
    }
    return `LV ${"level" in item ? item.level : ""}`;
  };

  const getMaxSuffix = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "station") {
      if ("level" in item) {
        if (item.level === 1) return ALL_COLOR.SandyOchre;
        if (item.level === 2) return ALL_COLOR.BurningOrange;
        if (item.level === 3) return ALL_COLOR.OliveTeal;
        if (item.level === 4) return ALL_COLOR.CobaltBlue;
        if (item.level === 5) return ALL_COLOR.IndigoViolet;
        if (item.level === 6) return ALL_COLOR.RoyalPurple;
      }
    }

    return ALL_COLOR.AshGray;
  };

  const getMaster = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "station") {
      if ("station_master_id" in item) {
        return item.station_master_id || "";
      }
    }
    return "";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={("id" in item && item.id) || index}
          className="bg-muted rounded-lg p-3 text-center m-2"
        >
          {type !== "station" && (
            <div className="relative w-14 h-14 mx-auto mb-2">
              <Image
                src={item.image || ""}
                alt={item.name.en || ""}
                fill
                className="rounded object-contain"
              />

              {type === "item" &&
                "found_in_raid" in item &&
                item.found_in_raid && (
                  <CheckCircle className="absolute bottom-0 right-0 w-4 h-4 text-white rounded-full" />
                )}
            </div>
          )}
          {type === "station" && (
            <div className="w-14 h-14 mx-auto mb-2 rounded">
              {getStationSVG(getMaster(item), 60, 60, getMaxSuffix(item))}
            </div>
          )}
          {type === "item" ? (
            <>
              <p className="text-sm text-gray-900 dark:text-white font-semibold">
                {item.name[localeKey]}
              </p>
              <p className="text-gray-900 dark:text-white text-xs font-semibold">
                x {"quantity" in item ? item.quantity : 1}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-900 dark:text-white font-semibold">
                {item.name[localeKey]}
              </p>
              <p className="text-gray-900 dark:text-white text-xs font-semibold">
                {checkType(item)}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
