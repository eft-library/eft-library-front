"use client";

import type { ItemTooltipTypes } from "../rank.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { rankI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ItemTooltip({ item, position }: ItemTooltipTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [tooltipPosition, setTooltipPosition] = useState({
    x: 0,
    y: 0,
    transform: "",
  });
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);

  useEffect(() => {
    setIsPositionCalculated(false);

    const calculatePosition = () => {
      const screenWidth = window.innerWidth;
      const padding = 16; // 화면 가장자리 여백

      // 모바일과 데스크톱에 따른 툴팁 크기
      const tooltipWidth =
        screenWidth < 640 ? Math.min(screenWidth - padding * 2, 260) : 320;
      const tooltipHeight = 200; // 대략적인 툴팁 높이

      let x = position.x;
      let y = position.y;
      let transform = "";

      // X축 위치 조정
      if (x + tooltipWidth / 2 > screenWidth - padding) {
        // 오른쪽 경계를 벗어나는 경우
        x = screenWidth - tooltipWidth - padding;
        transform = "translate(0, -100%)";
      } else if (x - tooltipWidth / 2 < padding) {
        // 왼쪽 경계를 벗어나는 경우
        x = padding;
        transform = "translate(0, -100%)";
      } else {
        // 중앙 정렬
        transform = "translate(-50%, -100%)";
      }

      // Y축 위치 조정
      if (y - tooltipHeight < padding) {
        // 위쪽 경계를 벗어나는 경우, 아래쪽에 표시
        y = position.y + 40; // 카드 아래쪽
        transform = transform.replace("-100%", "0%");
      }

      setTooltipPosition({ x, y, transform });
      setIsPositionCalculated(true);
    };

    calculatePosition();

    // 화면 크기 변경 시 재계산
    const handleResize = () => {
      setIsPositionCalculated(false);
      calculatePosition();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  return (
    <div
      className={`fixed z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-3 sm:p-4 pointer-events-none w-[260px] sm:min-w-[280px] sm:max-w-[320px] transition-opacity duration-150 ${
        isPositionCalculated ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${tooltipPosition.x}px`,
        top: `${tooltipPosition.y}px`,
        transform: tooltipPosition.transform,
      }}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700 relative">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name.en}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm mb-1 truncate">
            {item.name[localeKey]}
          </h3>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {item.category}
          </div>
        </div>
      </div>

      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1 text-xs">
              {rankI18N.fleaMarketPrice[localeKey]}
            </div>
            <div className="font-mono font-medium text-green-600 dark:text-green-400 text-xs">
              {item.flea_market_price.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-500 dark:text-gray-400 mb-1 text-xs">
              {rankI18N.slotPerPrice[localeKey]}
            </div>
            <div className="font-mono font-medium text-blue-600 dark:text-blue-400 text-xs">
              {item.per_slot.toLocaleString()}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500 dark:text-gray-400 mb-1 text-xs">
              {rankI18N.slotSize[localeKey]}
            </div>
            <div className="font-medium text-gray-900 dark:text-white text-xs">
              {item.width} x {item.height}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
