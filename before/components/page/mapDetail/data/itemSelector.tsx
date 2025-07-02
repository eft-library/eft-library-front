"use client";

import { ItemSVG } from "@/components/custom/getIcon/getSVG";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/provider";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ItemSelector } from "./mapType";
import Loading from "@/components/custom/loading/loading";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function ItemSelector({
  viewItemList,
  onClickItemAction,
  onClickAllItemAction,
  originItemList,
}: ItemSelector) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { newItemFilter } = useAppStore((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const [originalItem, setOriginalItem] = useState<string[]>();

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

  const checkAll = () => {
    if (originalItem) {
      return (
        viewItemList.length === originalItem.length &&
        viewItemList.sort().toString() === originalItem.sort().toString()
      );
    }
    return true;
  };

  if (!originalItem || !newItemFilter) return <Loading />;

  return (
    <div className="relative z-20">
      {/* Accordion Header - 고정된 위치 */}
      <div
        className={`fixed left-4 overflow-auto h-[75%] top-1/2 transform -translate-y-1/2 z-5 w-56 p-4 rounded-md transition-all duration-300 ease-in-out ${
          isOpen ? "border border-white bg-black" : ""
        }`}
      >
        <div
          className={`flex flex-col p-2 justify-between items-center cursor-pointer ${
            isOpen ? "bg-black" : "border border-white rounded-lg bg-black"
          }`}
        >
          <div
            className={"w-full flex justify-between items-center"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <TextSpan isCenter={false} size="xl">
              Filter
            </TextSpan>
            <TextSpan isCenter={false}>
              {isOpen ? <ChevronDown /> : <ChevronUp />}
            </TextSpan>
          </div>
          <div
            className={`w-full overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isOpen ? "max-h-[75vh] pt-4" : "max-h-0"
            }`}
          >
            {/* 전체 버튼 */}
            <div
              className="flex items-center cursor-pointer mb-2"
              onClick={() => onClickAllItemAction(checkAll())}
            >
              {checkAll() ? (
                <Eye className="mr-2 text-xl text-white" />
              ) : (
                <EyeOff className="mr-2 text-xl text-white opacity-50" />
              )}
              <span
                className={`font-bold text-lg text-white ${
                  checkAll() ? "" : "opacity-50"
                }`}
              >
                ALL
              </span>
            </div>

            {/* 아이템 목록 */}
            <div className="space-y-4">
              {newItemFilter.map(
                (item) =>
                  originalItem.includes(item.value) && (
                    <div key={item.value} className="space-y-1">
                      <span
                        className={`cursor-pointer font-bold text-lg ${
                          viewItemList.includes(item.value)
                            ? "text-white"
                            : "text-white opacity-50"
                        }`}
                        onClick={() => onClickItemAction(item.value)}
                      >
                        {item.name[localeKey]}
                      </span>

                      {/* 서브 아이템들 */}
                      {item.sub
                        .filter((childItem) =>
                          originItemList.some(
                            (org) => childItem.value === org.childValue
                          )
                        )
                        .map((childItem) => (
                          <div
                            key={childItem.value}
                            className="flex items-center space-x-2"
                            onClick={() => onClickItemAction(childItem.value)}
                          >
                            <ItemSVG
                              scale={4}
                              x={0}
                              y={0}
                              svgValue={childItem.value}
                              isEnable={viewItemList.includes(childItem.value)}
                            />
                            <span
                              className={`cursor-pointer text-sm font-bold ${
                                viewItemList.includes(childItem.value)
                                  ? "text-white"
                                  : "text-white opacity-50"
                              }`}
                            >
                              {childItem.name[localeKey]}
                            </span>
                          </div>
                        ))}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
