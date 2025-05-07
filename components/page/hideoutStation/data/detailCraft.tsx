"use client";

import TextSpan from "@/components/custom/gridContents/textSpan";
import type { DetailCraft, CraftItem } from "./stationType";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { hideoutI18n } from "@/lib/consts/i18nConsts";

export default function DetailCraft({ crafts }: DetailCraft) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [openTooltipIndex, setOpenTooltipIndex] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<CraftItem>();

  const onHoverItem = (itemInfo: CraftItem, index: string | null) => {
    setOpenTooltipIndex(index);
    setHoverItem(itemInfo);
  };

  const changeTime = (sec: number | undefined) => {
    if (!sec) return `${0} ${hideoutI18n.min[localeKey]}`;

    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    if (hours > 0 && minutes > 0) {
      return `${hours} ${hideoutI18n.hour[localeKey]} ${minutes} ${hideoutI18n.min[localeKey]}`;
    } else if (hours > 0) {
      return `${hours} ${hideoutI18n.hour[localeKey]}`;
    } else {
      return `${minutes} ${hideoutI18n.min[localeKey]}`;
    }
  };

  return (
    crafts && (
      <div className="flex flex-col justify-center w-full gap-6">
        {crafts.map((craft, index) => (
          <div
            key={`${craft.level}-${index}-make`}
            className={`flex flex-col gap-2 pb-2 ${
              index !== crafts.length - 1
                ? "border-solid border-b-[1px] border-white"
                : ""
            }`}
          >
            <span className="font-bold text-lg">
              {craft.name[localeKey]} {hideoutI18n.craft[localeKey]}
            </span>
            <div className="flex gap-2 items-center">
              {craft.req_item.map((req, sIndex) => (
                <div key={`${craft.name.en}-${req.item.name_en}-${sIndex}`}>
                  <TooltipProvider>
                    <Tooltip
                      open={
                        openTooltipIndex ===
                        `${craft.name.en}-${req.item.name_en}-${sIndex}`
                      }
                      onOpenChange={(open) =>
                        open
                          ? setOpenTooltipIndex(
                              `${craft.name.en}-${req.item.name_en}-${sIndex}`
                            )
                          : setOpenTooltipIndex(null)
                      }
                    >
                      <TooltipTrigger>
                        <Image
                          width={req.item.width * 60}
                          height={req.item.height * 60}
                          alt={req.item.name_en}
                          key={`${craft.name.en}-${req.item.name_en}-${sIndex}`}
                          onMouseEnter={() =>
                            onHoverItem(
                              req,
                              `${craft.name.en}-${req.item.name_en}-${sIndex}`
                            )
                          }
                          onMouseLeave={() => setOpenTooltipIndex(null)}
                          onFocus={() =>
                            onHoverItem(
                              req,
                              `${craft.name.en}-${req.item.name_en}-${sIndex}`
                            )
                          }
                          onBlur={() => setOpenTooltipIndex(null)}
                          src={req.item.gridImageLink}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        align="center"
                        className="bg-Background border-solid border-white border-2"
                      >
                        <TextSpan size="base" textColor="GoldenYellow">
                          {hoverItem?.item[getOtherLocalizedKey(localeKey)]}
                        </TextSpan>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="relative">
                    <div className="absolute bottom-1 right-0">
                      <span className="text-white text-xs font-bold">
                        x{req.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col w-[100px] justify-center items-center">
                <MoveRight strokeWidth={1} size={60} />
                <TextSpan size="base">{changeTime(craft.duration)}</TextSpan>
              </div>

              <div>
                <Image
                  width={craft.width * 60}
                  height={craft.height * 60}
                  alt={craft.name.en || ""}
                  src={craft.image || ""}
                  placeholder="blur"
                  blurDataURL={
                    "data:image/jpeg;base64," +
                    "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  }
                />
                <div className="relative">
                  <div className="absolute bottom-0 right-0">
                    <span className="text-white text-sm font-bold">
                      x{craft.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
