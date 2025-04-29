"use client";

import { Separator } from "@/components/ui/separator";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";
import AdBanner from "../../../custom/adsense/adBanner";
import "../../../../assets/quest.css";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { QuestDesc } from "../../quest/data/questTypes";
import { SquareCheckBig, SquareX } from "lucide-react";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { relatedQuestTableColumn } from "@/lib/consts/columnConsts";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { useLocale } from "next-intl";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
  getOtherLocalizedKey,
} from "@/lib/func/localeFunction";

export default function QuestDesc({ questInfo }: QuestDesc) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full flex flex-col gap-10 items-center">
      {questInfo.objectives && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            목표
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.objectives.map((objective, index) => (
            <div
              key={`${index}-objective`}
              className="font-bold text-base text-white"
            >
              *&nbsp;{objective[getDescriptionLocaleKey(locale)]}
            </div>
          ))}
        </div>
      )}

      {questInfo.finish_rewards && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            보상
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.finish_rewards.items.map((rewards, index) => (
            <div
              key={`${index}-rewards`}
              className="font-bold text-base text-white"
            >
              *&nbsp;{rewards.item[getOtherLocalizedKey(locale)]} x&nbsp;
              {rewards.quantity}
            </div>
          ))}
        </div>
      )}

      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        {questInfo.objectives.some(
          (item) =>
            (item.type === "giveItem" || item.type === "findItem") && item.items
        ) && (
          <>
            <TableColumn
              columnDesign={8}
              columnData={relatedQuestTableColumn}
              isRelatedQuest
            />
            {questInfo.objectives.map(
              (item) =>
                (item.type === "giveItem" || item.type === "findItem") &&
                item.items &&
                item.items.map((subItem, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="w-full grid grid-cols-8 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3"
                  >
                    <div className="flex justify-center items-center col-span-2">
                      <ImageView
                        src={subItem.gridImageLink}
                        alt={subItem.name_en}
                        popWidth={200}
                        popHeight={180}
                        size="170px"
                        wrapWidth={170}
                        wrapHeight={100}
                      />
                    </div>
                    <div className="flex justify-center items-center col-span-2">
                      <TextSpan>
                        {subItem[getOtherLocalizedKey(locale)]}
                      </TextSpan>
                    </div>
                    <div className="flex justify-center items-center">
                      <TextSpan>{item.count}</TextSpan>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-base flex justify-center items-center">
                        {item.foundInRaid ? (
                          <SquareCheckBig
                            color={ALL_COLOR.ScreaminGreen}
                            strokeWidth={3}
                            size={23}
                          />
                        ) : (
                          <SquareX
                            color={ALL_COLOR.Red}
                            strokeWidth={3}
                            size={25}
                          />
                        )}
                      </span>
                    </div>
                    <div className="flex justify-center items-center col-span-2">
                      {item.description_en && (
                        <div className="flex justify-center items-center">
                          <TextSpan>
                            {item[getDescriptionLocaleKey(locale)]}
                          </TextSpan>
                        </div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </>
        )}
      </div>

      {questInfo.guide && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            가이드
          </TextSpan>
          <Separator className="bg-white" />
          <HtmlWithImage contents={questInfo.guide[localeKey]} />
        </div>
      )}
    </div>
  );
}
