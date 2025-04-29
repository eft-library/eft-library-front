"use client";

import { useRouter } from "next/navigation";
import React from "react";
import TextSpan from "../../../custom/gridContents/textSpan";
import { handleHover, handleHoverExit } from "@/lib/func/jsxfunction";
import type { NpcDetail } from "../../quest/data/questTypes";
import Link from "next/link";
import { SquareCheckBig, SquareX } from "lucide-react";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";

export default function NpcDetail({ questInfo }: NpcDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
            backgroundImage: `url(${questInfo.npc_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverExit}
          onClick={() => onClickNPC()}
        />
        <h1 className="text-xl font-bold text-white flex text-center flex items-center justify-center">
          {questInfo.name[getLocaleKey(localeKey)]}
        </h1>
        <div className="flex justify-between items-center gap-4">
          <TextSpan size="lg">Kappa</TextSpan>
          {questInfo.kappa_required ? (
            <SquareCheckBig
              color={ALL_COLOR.ScreaminGreen}
              strokeWidth={3}
              size={23}
            />
          ) : (
            <SquareX color={ALL_COLOR.Red} strokeWidth={3} size={25} />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col w-[50%]">
          <TextSpan size="lg" textColor="GoldenYellow">
            이전
          </TextSpan>

          {!questInfo.task_requirements ||
          questInfo.task_requirements.length <= 0 ? (
            <TextSpan>-</TextSpan>
          ) : (
            questInfo.task_requirements.map((item) => {
              return (
                <span
                  className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow "
                  key={item.task.id}
                >
                  <Link href={`/quest/detail/${item.task.normalizedName}`}>
                    {item.task[getOtherLocalizedKey(localeKey)]}
                  </Link>
                </span>
              );
            })
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <TextSpan size="lg" textColor="GoldenYellow">
            다음
          </TextSpan>
          {!questInfo.task_next || questInfo.task_next.length <= 0 ? (
            <TextSpan>-</TextSpan>
          ) : (
            questInfo.task_next.map((item) => {
              return (
                <span
                  className="text-white font-bold text-center cursor-pointer hover:text-PaleYellow "
                  key={item.task.id}
                >
                  <Link href={`/quest/detail/${item.task.normalizedName}`}>
                    {item.task[getOtherLocalizedKey(localeKey)]}
                  </Link>
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
