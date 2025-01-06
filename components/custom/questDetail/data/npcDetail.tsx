"use client";

import { formatImage } from "@/lib/func/formatImage";
import { useRouter } from "next/navigation";
import React from "react";
import TextSpan from "../../gridContents/textSpan";
import { getQuestTitle } from "@/lib/func/jsxfunction";

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
interface NpcDetail {
  questInfo: Quest;
}

export default function NpcDetail({ questInfo }: NpcDetail) {
  const router = useRouter();

  const onClickNPC = () => {
    router.push("/quest");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`cursor-pointer w-[140px] h-[140px] rounded-lg outline outline-2 outline-[color:white]`}
          style={{
            backgroundImage: `url(${formatImage(questInfo.image)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => onClickNPC()}
        />
        <h1 className="text-xl font-bold text-white flex text-center flex items-center justify-center">
          {getQuestTitle(questInfo.title_kr, "kr")}
          <br />
          {getQuestTitle(questInfo.title_kr, "en")}
        </h1>
        <TextSpan size="lg">
          {questInfo.required_kappa ? "✅" : "❌"}&nbsp;&nbsp;&nbsp;Kappa
        </TextSpan>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-[50%]">
          <TextSpan size="lg" textColor="GoldenYellow">
            이전
          </TextSpan>

          {!questInfo.requires || questInfo.requires.length <= 0 ? (
            <TextSpan>-</TextSpan>
          ) : (
            questInfo.requires.map((item) => {
              const others = questInfo.requires
                ? questInfo.requires.filter((i) => i.is_other)
                : [];
              const isLastOther =
                item.is_other && others.indexOf(item) === others.length - 1;

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <span className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow mb-1">
                      <a href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </a>
                    </span>
                  ) : (
                    <>
                      <TextSpan isCursor hoverColor="LightOrange">
                        <a href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </a>
                      </TextSpan>
                      {!isLastOther && <TextSpan size="lg">or</TextSpan>}
                    </>
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <TextSpan size="lg" textColor="GoldenYellow">
            다음
          </TextSpan>
          {!questInfo.next || questInfo.next.length <= 0 ? (
            <TextSpan>-</TextSpan>
          ) : (
            questInfo.next.map((item) => {
              const isLastOther =
                item.is_other &&
                questInfo.next &&
                questInfo.next.filter((i) => i.is_other).length - 1 ===
                  questInfo.next.filter((i) => i.is_other).indexOf(item);

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <span className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow mb-1">
                      <a href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </a>
                    </span>
                  ) : (
                    <>
                      <TextSpan isCursor hoverColor="LightOrange">
                        <a href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </a>
                      </TextSpan>
                      {!isLastOther && <TextSpan size="lg">or</TextSpan>}
                    </>
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
