"use client";

import { Separator } from "@/components/ui/separator";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";
import AdBanner from "../../../custom/adsense/adBanner";
import "../../../../assets/quest.css";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import { relatedQuestColumn } from "@/lib/consts/gridContsts";
import type { QuestDesc } from "../../quest/data/questTypes";
import { SquareCheckBig, SquareX } from "lucide-react";

export default function QuestDesc({ questInfo }: QuestDesc) {
  return (
    <div className="w-full flex flex-col gap-10 items-center">
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
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>

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
              <div className="flex flex-col justify-center items-center gap-2">
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
                        size="170px"
                        wrapWidth={170}
                        wrapHeight={100}
                      />
                    </div>
                    <div className="flex justify-center items-center col-span-2">
                      <TextSpan hoverColor="PaleYellow">
                        {item.item_name_kr}
                      </TextSpan>
                    </div>
                    <div className="flex justify-center items-center">
                      <TextSpan>{item.count}</TextSpan>
                    </div>
                    <div className="flex justify-center items-center">
                      <span
                        className={`text-base flex justify-center items-center`}
                      >
                        {item.in_raid ? (
                          <SquareCheckBig
                            color="#5EFF5E"
                            strokeWidth={3}
                            size={23}
                          />
                        ) : (
                          <SquareX color="#FF0000" strokeWidth={3} size={25} />
                        )}
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
