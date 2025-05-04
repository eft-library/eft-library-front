"use client";

import { Separator } from "@/components/ui/separator";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";
import AdBanner from "../../../custom/adsense/adBanner";
import "../../../../assets/quest.css";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { QuestDesc } from "../../quest/data/questTypes";
import { Redo2, SquareCheckBig, SquareX } from "lucide-react";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { relatedQuestTableColumn } from "@/lib/consts/columnConsts";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
  getOtherLocalizedKey,
} from "@/lib/func/localeFunction";
import DefineGrid from "@/components/custom/gridContents/defineGrid";
import CenterContents from "@/components/custom/gridContents/centerContents";

export default function QuestDesc({ questInfo }: QuestDesc) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const mergedItems = questInfo.objectives.flatMap((item) => {
    if ((item.type === "giveItem" || item.type === "findItem") && item.items) {
      return item.items.map((subItem) => ({
        id: subItem.id,
        type: item.type,
        count: item.count,
        foundInRaid: item.foundInRaid,
        itemData: subItem,
      }));
    }

    if (
      (item.type === "findQuestItem" || item.type === "giveQuestItem") &&
      item.questItem
    ) {
      return [
        {
          id: item.questItem.id,
          type: item.type,
          count: item.count,
          foundInRaid: item.foundInRaid,
          itemData: item.questItem,
        },
      ];
    }

    return [];
  });

  const questItems = Array.from(
    new Map(mergedItems.map((entry) => [entry.itemData.id, entry])).values()
  );

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

      <div className="w-full flex flex-col">
        {questItems.length > 0 && (
          <>
            <TableColumn
              columnDesign={6}
              columnData={relatedQuestTableColumn}
              isNameLarge
            />
            {questItems.map((qItem) => (
              <DefineGrid
                id={qItem.id}
                cols="6"
                key={qItem.id}
                isDetail
                detailLink={`/item/${qItem.itemData.normalizedName}`}
              >
                <CenterContents>
                  <ImageView
                    src={qItem.itemData.gridImageLink}
                    alt={qItem.itemData.name_en}
                    popWidth={200}
                    popHeight={180}
                    size="170px"
                    wrapWidth={170}
                    wrapHeight={100}
                  />
                </CenterContents>
                <CenterContents colSpan="3">
                  {qItem.type === "findQuestItem" ||
                  qItem.type === "giveQuestItem" ? (
                    <Link
                      href={`/item/${qItem.itemData.normalizedName}`}
                      target="_blank"
                    >
                      <TextSpan hoverColor="GoldenYellow">
                        {qItem.itemData[getOtherLocalizedKey(locale)]}
                      </TextSpan>
                    </Link>
                  ) : (
                    <TextSpan hoverColor="GoldenYellow">
                      {qItem.itemData[getOtherLocalizedKey(locale)]}
                    </TextSpan>
                  )}
                </CenterContents>
                <CenterContents>
                  <TextSpan>{qItem.count}</TextSpan>
                </CenterContents>
                <CenterContents>
                  <span className="text-base flex justify-center items-center">
                    {qItem.foundInRaid ? (
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
                </CenterContents>
              </DefineGrid>
            ))}
          </>
        )}
      </div>

      {questInfo.guide && (
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between">
            <TextSpan size="3xl" isCenter={false}>
              가이드
            </TextSpan>
            <div className="flex gap-2 items-center">
              <Redo2 />
              <Link target="_blank" href={questInfo.wiki_url}>
                <TextSpan
                  size="3xl"
                  isCenter={false}
                  hoverColor="GoldenYellow"
                  textColor="CreamYellow"
                  isCursor
                >
                  Wiki Quest Page
                </TextSpan>
              </Link>
            </div>
          </div>

          <Separator className="bg-white" />
          <HtmlWithImage contents={questInfo.guide[localeKey]} />
        </div>
      )}
    </div>
  );
}
