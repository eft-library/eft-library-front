"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { ItemFilterTypes } from "../map.types";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Filter } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/provider";
import { GetIcon } from "@/components/custom/GetIcon/get-icon";
import { cn } from "@/lib/utils";
import Loading from "@/components/custom/Loading/loading";

export default function ItemFilter({
  viewItemList,
  onClickItemAction,
  onClickAllItemAction,
  originItemList,
  mapType,
  setMapType,
}: ItemFilterTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [originalItem, setOriginalItem] = useState<string[]>();
  const { newItemFilter } = useAppStore((state) => state);

  useEffect(() => {
    if (originItemList) {
      const valuesSet = new Set<string>();
      originItemList.forEach((item) => {
        valuesSet.add(item.childValue);
        valuesSet.add(item.motherValue);
      });

      // Set 객체를 배열로 변환합니다.
      const valuesList: string[] = [...valuesSet];
      setOriginalItem(valuesList);
    }
  }, [originItemList]);

  if (!originalItem || !newItemFilter) return <Loading />;

  return (
    <div className="p-4 md:p-6 dark:bg-gray-800/30 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 md:gap-0">
        {/* Left side: Filter Title and Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-xl font-semibold whitespace-nowrap">
              {interactiveMapI18N.itemFilter[localeKey]}
            </h2>
          </div>
          <ToggleGroup
            type="single"
            value={mapType}
            onValueChange={(value: "2D" | "3D") => setMapType(value)}
            className="rounded-full bg-muted p-1 w-full md:w-auto justify-center"
          >
            <ToggleGroupItem
              value="2D"
              aria-label="Toggle 2D map"
              className=" cursor-pointer px-4 py-2 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex-1 md:flex-none font-semibold"
            >
              {interactiveMapI18N.map2D[localeKey]}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="3D"
              aria-label="Toggle 3D map"
              className=" cursor-pointer px-4 py-2 rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex-1 md:flex-none font-semibold"
            >
              {interactiveMapI18N.map3D[localeKey]}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Right side: Selected count and Select/Deselect All */}
        <div className="flex items-center justify-end md:justify-start text-sm w-full md:w-auto gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClickAllItemAction(true)}
            className="whitespace-nowrap cursor-pointer"
          >
            {interactiveMapI18N.selectAll[localeKey]}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onClickAllItemAction(false)}
            className="whitespace-nowrap cursor-pointer"
          >
            {interactiveMapI18N.deselectAll[localeKey]}
          </Button>
        </div>
      </div>

      {/* Removed the outer ScrollArea */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newItemFilter.map((category) => (
          <div
            key={category.name.en}
            className="border rounded-lg p-4 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">
                {category.name[localeKey]}
              </h3>
            </div>
            {/* Added ScrollArea for individual category items */}
            <ScrollArea className="h-[150px] pr-4 -mr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.sub
                  .filter((item) =>
                    originItemList.some((org) => item.value === org.childValue)
                  )
                  .map((item) => (
                    <div
                      key={item.name.en}
                      className="flex items-center space-x-2 cursor-pointer" // Added cursor-pointer
                      onClick={() => onClickItemAction(item.value)} // Added onClick handler
                    >
                      <GetIcon
                        scale={4}
                        x={0}
                        y={0}
                        svgValue={item.value}
                        isEnable={viewItemList.includes(item.value)}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          viewItemList.includes(item.value)
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.name[localeKey]}
                      </span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        ))}
      </div>
    </div>
  );
}
