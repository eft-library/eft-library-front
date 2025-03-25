"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import type { DetailCraft } from "./stationType";
import Image from "next/image";
import { MoveRight } from "lucide-react";

export default function DetailCraft({ crafts }: DetailCraft) {
  const changeTime = (sec: number | undefined) => {
    if (!sec) return "0 분";

    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    if (hours > 0 && minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${minutes}분`;
    }
  };
  return (
    crafts && (
      <div className="flex flex-col justify-center w-full gap-6">
        {crafts.map((craft, index) => (
          <div key={`${craft.level}-${index}-make`} className="flex flex-col">
            <span className="font-bold text-sm">{craft.name_kr}</span>
            <div className="flex gap-2 items-center">
              {craft.req_item.map((req, sIndex) => (
                <div key={`${craft.name_en}-${req.item.name}-${sIndex}`}>
                  <Image
                    width={req.item.width * 60}
                    height={req.item.height * 60}
                    alt={req.item.name}
                    key={`${craft.name_en}-${req.item.name}-${sIndex}`}
                    src={req.item.gridImageLink}
                  />
                  <div className="relative">
                    <div className="absolute bottom-0 right-0">
                      <span className="text-white text-xs font-bold">
                        x{req.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col w-[80px] justify-center items-center">
                <MoveRight strokeWidth={1} size={60} />
                <TextSpan size="sm">{changeTime(craft.duration)}</TextSpan>
              </div>

              <div>
                <Image
                  width={craft.width * 60}
                  height={craft.height * 60}
                  alt={craft.name_en || ""}
                  src={craft.image || ""}
                />
                <div className="relative">
                  <div className="absolute bottom-0 right-0">
                    <span className="text-white text-xs font-bold">
                      x{craft.quantity}
                    </span>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
