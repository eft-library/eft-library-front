"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BossSelectorClient() {
  const param = useParams<{ id: string }>();

  const bossColumn = [
    { id: "RESHALA", link: "/boss/RESHALA", order: 1, name_kr: "르샬라" },
    { id: "KOLLONTAY", link: "/boss/KOLLONTAY", order: 2, name_kr: "콜론테이" },
    { id: "KILLA", link: "/boss/KILLA", order: 3, name_kr: "킬라" },
    { id: "KABAN", link: "/boss/KABAN", order: 4, name_kr: "카반" },
    { id: "TAGILLA", link: "/boss/TAGILLA", order: 5, name_kr: "타길라" },
    { id: "ZRYACHIY", link: "/boss/ZRYACHIY", order: 6, name_kr: "지랴키" },
    { id: "SHTURMAN", link: "/boss/SHTURMAN", order: 7, name_kr: "슈트르만" },
    { id: "SANITAR", link: "/boss/SANITAR", order: 8, name_kr: "세니타" },
    { id: "GLUKHAR", link: "/boss/GLUKHAR", order: 9, name_kr: "글루하" },
    { id: "BIG_PIPE", link: "/boss/BIG_PIPE", order: 10, name_kr: "빅파이프" },
    { id: "BIRDEYE", link: "/boss/BIRDEYE", order: 11, name_kr: "버드아이" },
    { id: "KNIGHT", link: "/boss/KNIGHT", order: 12, name_kr: "나이트" },
    { id: "CULTISTS", link: "/boss/CULTISTS", order: 13, name_kr: "컬티스트" },
    { id: "PARTISAN", link: "/boss/PARTISAN", order: 14, name_kr: "파르티잔" },
  ];

  return (
    <div className="flex justify-between w-full flex-wrap rounded-lg border-solid border-2 border-white p-1">
      {bossColumn.map((boss) => (
        <Link href={boss.link} key={boss.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-CloudGray": param.id === boss.id },
              { "text-Background": param.id === boss.id }
            )}
          >
            <span className="text-center font-bold">{boss.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
