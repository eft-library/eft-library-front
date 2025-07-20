"use client";

import { useRef } from "react";
import { ItemCardTypes } from "../rank.types";
import { rankCardTierColors } from "@/lib/consts/libraryConsts";
import Image from "next/image";

export default function ItemCard({
  item,
  tier,
  onTooltipShow,
  isHighlighted,
}: ItemCardTypes) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const position = {
        x: rect.left + rect.width / 2,
        y: rect.top,
      };
      onTooltipShow(item, position);
    }
  };

  const handleMouseLeave = () => {
    onTooltipShow(null);
  };

  return (
    <div
      ref={cardRef}
      className={`
        aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2
        transition-all duration-200 relative
        ${rankCardTierColors[tier]}
        ${
          isHighlighted
            ? "ring-2 ring-yellow-400 ring-offset-2 dark:ring-offset-gray-900"
            : "opacity-60 brightness-90 bg-gray-100 dark:bg-gray-900"
        }
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={item.image || "/placeholder.svg"}
        alt={item.name.en}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
