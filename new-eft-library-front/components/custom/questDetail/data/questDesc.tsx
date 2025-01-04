"use client";

import { Separator } from "@/components/ui/separator";
import GetClientColumn from "../../getColumn/getClientColumn";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import Link from "next/link";
import HtmlWithImage from "@/components/htmlWithImage/htmlWithImage";
import AdBanner from "../../adsense/adBanner";

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
  const relatedQuestColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
    { name: "수량", colSpan: 1 },
    { name: "인레이드", colSpan: 1 },
    { name: "노트", colSpan: 2 },
  ];

  return (
    <div className="w-full flex flex-col gap-10">
      {questInfo.requirements_kr && (
        <div className="w-full flex flex-col gap-2">
          <span className="font-bold text-3xl">요구사항</span>
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
          <span className="font-bold text-3xl">목표</span>
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
          <span className="font-bold text-3xl">보상</span>
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
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />

      {((questInfo.sub && questInfo.sub.length > 0) || questInfo.guide) && (
        <div className="w-full flex flex-col gap-2">
          <span className="font-bold text-3xl">가이드</span>
          <Separator className="bg-white" />
          {questInfo.sub && questInfo.sub.length > 0 && (
            <div className="w-full flex flex-col gap-4">
              <span className="font-bold text-xl">관련 퀘스트 아이템</span>
              <div className="flex flex-col justify-center items-center gap-4">
                <GetClientColumn
                  columnLength={6}
                  columnList={relatedQuestColumn}
                />
                {questInfo.sub.map((item) => (
                  <div
                    key={item.item_id}
                    className="w-full grid grid-cols-6 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
                  >
                    <div className="flex justify-center items-center">
                      <Gallery>
                        <Item
                          original={item.item_image}
                          width="200"
                          height="180"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref}
                              onClick={open}
                              src={item.item_image}
                              height={0}
                              width={120}
                              style={{ width: "auto", height: "auto" }}
                              alt={item.item_name_en}
                              priority
                            />
                          )}
                        </Item>
                      </Gallery>
                    </div>
                    <div className="flex justify-center items-center">
                      <Link
                        href={`${item.item_link}${item.item_id}`}
                        scroll={false}
                      >
                        <span className="text-center font-bold text-base hover:text-LightYellow">
                          {item.item_name_kr}
                        </span>
                      </Link>
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-center font-bold text-base">
                        {item.count}
                      </span>
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
                            <span className="text-center font-bold text-base">
                              {desc}
                            </span>
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
