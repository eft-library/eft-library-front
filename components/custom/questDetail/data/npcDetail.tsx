"use client";

import { formatImage } from "@/lib/func/formatImage";
import { useRouter } from "next/navigation";
import React from "react";

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

  const getTitle = (title: string) => {
    return (
      <h1 className="text-xl font-bold text-white flex text-center flex items-center justify-center">
        {title.substring(0, title.indexOf("(")).trim()}
        <br />
        {title.substring(title.indexOf("(")).trim()}
      </h1>
    );
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
        {getTitle(questInfo.title_kr)}
        <span className="text-white text-lg text-center font-bold">
          {questInfo.required_kappa ? "✅" : "❌"}&nbsp;&nbsp;&nbsp;Kappa
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col w-[50%]">
          <span className="text-GoldenYellow font-bold font-lg text-center">
            이전
          </span>
          {!questInfo.requires || questInfo.requires.length <= 0 ? (
            <span className="text-white font-bold text-center">-</span>
          ) : (
            questInfo.requires.map((item, index) => {
              const others = questInfo.requires
                ? questInfo.requires.filter((i) => i.is_other)
                : [];
              const isLastOther =
                item.is_other && others.indexOf(item) === others.length - 1;

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <span className="text-white font-bold text-center cursor-pointer hover:text-yellow-400 mb-1">
                      <a href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </a>
                    </span>
                  ) : (
                    <>
                      <span className="text-white font-bold text-center cursor-pointer hover:text-orange-400">
                        <a href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </a>
                      </span>
                      {!isLastOther && (
                        <span className="font-bold text-center">or</span>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <span className="text-yellow-400 font-bold text-center mb-2">
            다음
          </span>
          {!questInfo.next || questInfo.next.length <= 0 ? (
            <span className="text-white font-bold text-center">-</span>
          ) : (
            questInfo.next.map((item, index) => {
              const isLastOther =
                item.is_other &&
                questInfo.next &&
                questInfo.next.filter((i) => i.is_other).length - 1 ===
                  questInfo.next.filter((i) => i.is_other).indexOf(item);

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <span className="text-white font-bold text-center cursor-pointer hover:text-yellow-400 mb-1">
                      <a href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </a>
                    </span>
                  ) : (
                    <>
                      <span className="text-white font-bold text-center cursor-pointer hover:text-orange-400">
                        <a href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </a>
                      </span>
                      {!isLastOther && (
                        <span className="font-bold text-center">or</span>
                      )}
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
