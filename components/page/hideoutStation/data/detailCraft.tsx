"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import type { DetailCraft } from "./stationType";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function DetailCraft({ crafts }: DetailCraft) {
  const changeTime = (sec: number | undefined) => {
    if (!sec) return "0 시간";
    return Math.floor(sec / 3600) + " 시간 ";
  };
  return (
    crafts && (
      <div className="flex flex-col justify-center w-full gap-4">
        {crafts.map((craft, index) => (
          <div
            className="flex gap-4 items-center"
            key={`${craft.level}-${index}-make`}
          >
            {craft.req_item.map((req, sIndex) => (
              <div key={`${craft.name_en}-${req.item.name}-${sIndex}`}>
                <Image
                  width={60}
                  height={60}
                  alt={req.item.name}
                  key={`${craft.name_en}-${req.item.name}-${sIndex}`}
                  src={req.item.gridImageLink}
                />
              </div>
            ))}
            <div className="flex flex-col w-[100px]">
              <MoveRight strokeWidth={1} size={100} />
              <TextSpan>{changeTime(craft.duration)}</TextSpan>
            </div>

            <div>
              <Image
                width={60}
                height={60}
                alt={craft.name_en || ""}
                src={craft.image || ""}
              />
            </div>
            <div></div>
          </div>
        ))}
      </div>
    )
  );
}
