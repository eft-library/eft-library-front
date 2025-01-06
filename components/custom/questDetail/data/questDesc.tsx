"use client";

import { Separator } from "@/components/ui/separator";
import GetClientColumn from "../../getColumn/getClientColumn";
import Link from "next/link";
import HtmlWithImage from "@/components/htmlWithImage/htmlWithImage";
import AdBanner from "../../adsense/adBanner";
import "../../../../assets/quest.css";
import ImageView from "../../imageView/imageView";
import TextSpan from "../../gridContents/textSpan";
import { relatedQuestColumn } from "@/lib/consts/gridContsts";

interface Quest {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  npc_value: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  objectives_en: string[];
  requirements_en: string[];
  requirements_kr: string[];
  rewards_kr: string[];
  guide: string;
  requires: Require[] | null;
  next: Require[] | null;
  sub: RelatedQuests[];
  update_time: string;
  url_mapping: string;
}

interface RelatedQuests {
  item_name_en: string;
  item_name_kr: string;
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  in_raid: boolean | null;
  type: string;
  item_id: string;
  desc_text: string[] | null;
  count: number;
  item_image: string;
  item_link: string;
}

interface Require {
  id: string;
  name: string;
  name_kr: string;
  is_other: boolean;
  url_mapping: string;
}
interface QuestDesc {
  questInfo: Quest;
}
export default function QuestDesc({ questInfo }: QuestDesc) {
  return (
    <div className="w-full flex flex-col gap-10">
      {questInfo.requirements_kr && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            요구사항
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.requirements_kr.map((requirements, index) => (
            <div
              key={`${index}-requirements`}
              className="font-bold text-base text-white"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${requirements}`,
              }}
            />
          ))}
        </div>
      )}

      {questInfo.objectives_kr && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            목표
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.objectives_kr.map((objectives, index) => (
            <div
              key={`${index}-objectives`}
              className="font-bold text-base text-white"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${objectives}`,
              }}
            />
          ))}
        </div>
      )}

      {questInfo.rewards_kr && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            보상
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.rewards_kr.map((rewards, index) => (
            <div
              key={`${index}-rewards`}
              className="font-bold text-base text-white"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${rewards}`,
              }}
            />
          ))}
        </div>
      )}

      <AdBanner
        dataAdFormat={"auto"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />

      {((questInfo.sub && questInfo.sub.length > 0) || questInfo.guide) && (
        <div className="w-full flex flex-col gap-2">
          <TextSpan size="3xl" isCenter={false}>
            가이드
          </TextSpan>
          <Separator className="bg-white" />
          {questInfo.sub && questInfo.sub.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              <TextSpan size="xl" isCenter={false}>
                관련 퀘스트 아이템
              </TextSpan>
              <div className="flex flex-col justify-center items-center gap-4">
                <GetClientColumn
                  columnLength={8}
                  columnList={relatedQuestColumn}
                />
                {questInfo.sub.map((item) => (
                  <div
                    key={item.item_id}
                    className="w-full grid grid-cols-8 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3"
                  >
                    <div className="flex justify-center items-center col-span-2">
                      <ImageView
                        src={item.item_image}
                        alt={item.item_name_en}
                        popWidth={200}
                        popHeight={180}
                        size="240px"
                        wrapWidth={240}
                        wrapHeight={140}
                      />
                    </div>
                    <div className="flex justify-center items-center col-span-2">
                      <Link
                        href={`${item.item_link}${item.item_id}`}
                        scroll={false}
                      >
                        <TextSpan hoverColor="LightYellow">
                          {item.item_name_kr}
                        </TextSpan>
                      </Link>
                    </div>
                    <div className="flex justify-center items-center">
                      <TextSpan>{item.count}</TextSpan>
                    </div>
                    <div className="flex justify-center items-center">
                      <span
                        className={`${
                          item.in_raid ? "text-GoldenYellow" : "text-Red"
                        } text-base flex justify-center items-center`}
                      >
                        {item.in_raid ? "Y" : "N"}
                      </span>
                    </div>
                    <div className="flex justify-center items-center col-span-2">
                      {item.desc_text &&
                        item.desc_text.map((desc, index) => (
                          <div
                            key={`${index}-desc`}
                            className="flex justify-center items-center"
                          >
                            <TextSpan>{desc}</TextSpan>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <HtmlWithImage contents={questInfo.guide} />
        </div>
      )}
    </div>
  );
}
