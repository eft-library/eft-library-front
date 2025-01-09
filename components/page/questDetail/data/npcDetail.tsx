"use client";

import { formatImage } from "@/lib/func/formatImage";
import { useRouter } from "next/navigation";
import React from "react";
import TextSpan from "../../../custom/gridContents/textSpan";
import {
  getQuestTitle,
  handleHover,
  handleHoverExit,
} from "@/lib/func/jsxfunction";
import type { NpcDetail } from "../../quest/data/questTypes";
import Link from "next/link";

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
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverExit}
          onClick={() => onClickNPC()}
        />
        <h1 className="text-xl font-bold text-white flex text-center flex items-center justify-center">
          {getQuestTitle(questInfo.title_kr, "kr")}
          <br />
          {getQuestTitle(questInfo.title_kr, "en")}
        </h1>
        <TextSpan size="lg">
          Kappa&nbsp;&nbsp;&nbsp;{questInfo.required_kappa ? "✅" : "❌"}
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
                    <span className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow ">
                      <Link href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </Link>
                    </span>
                  ) : (
                    <>
                      <span className="text-white font-bold text-center cursor-pointer hover:text-SoftPink mt-[2px]">
                        <Link href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </Link>
                      </span>
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
                    <span className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow">
                      <Link href={`/quest/detail/${item.url_mapping}`}>
                        {item.name_kr}
                      </Link>
                    </span>
                  ) : (
                    <>
                      <span className="text-white font-bold text-center cursor-pointer hover:text-SoftPink mt-[1px]">
                        <Link href={`/quest/detail/${item.url_mapping}`}>
                          {item.name_kr}
                        </Link>
                      </span>
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
