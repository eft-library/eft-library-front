"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "@/i18n/config";
import type { TraderOffer } from "@/types/api/trader";
import type { TraderCopy } from "../copy";
import { OfferDetails, offerName } from "./offer-detail";
import { traderLevelColors } from "../config";

export function OfferCard({
  offer,
  locale,
  labels,
  onSelect,
}: {
  offer: TraderOffer;
  locale: Locale;
  labels: TraderCopy;
  onSelect: (id: string) => void;
}) {
  const id = useId();
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const tooltipOpen = position !== null;
  useEffect(() => {
    if (!tooltipOpen) return;
    const hide = () => setPosition(null);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [tooltipOpen]);
  const reward = offer.rewards[0];
  if (!reward) return null;
  const name = offerName(offer, locale);
  function show(element: HTMLButtonElement) {
    const rect = element.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 24);
    setPosition({
      left: Math.max(
        12,
        Math.min(
          rect.right + 12 + width < window.innerWidth
            ? rect.right + 12
            : rect.left - width - 12,
          window.innerWidth - width - 12,
        ),
      ),
      top: Math.max(12, Math.min(rect.top, window.innerHeight - 360)),
    });
  }
  return (
    <>
      <button
        type="button"
        aria-label={`${name} · LL${offer.trader_level} · ${labels[offer.offer_type]}`}
        aria-describedby={position ? id : undefined}
        style={{
          gridColumn: `span ${Math.min(12, Math.max(1, reward.item.width))}`,
          gridRow: `span ${Math.max(1, reward.item.height)}`,
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") show(event.currentTarget);
        }}
        onPointerLeave={() => setPosition(null)}
        onFocus={(event) => show(event.currentTarget)}
        onBlur={() => setPosition(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setPosition(null);
        }}
        onClick={() => {
          setPosition(null);
          onSelect(offer.id);
        }}
        className="group relative flex min-h-0 min-w-0 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-300 bg-surface-elevated p-0 hover:border-orange-500 hover:bg-orange-50 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-gray-600 dark:hover:bg-orange-500/10"
      >
        {reward.item.image && failedImage !== reward.item.image ? (
          <Image
            src={reward.item.image}
            alt=""
            width={reward.item.width * 64}
            height={reward.item.height * 64}
            unoptimized
            loading="lazy"
            onError={() => setFailedImage(reward.item.image)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="line-clamp-3 break-words px-1 text-xs leading-snug">
            {name}
          </span>
        )}
        <span className="absolute left-1 top-1 rounded border border-white/40 bg-gray-950/95 px-1.5 py-0.5 font-mono text-xs font-bold leading-4 text-white shadow-md">
          <span
            className={
              traderLevelColors[offer.trader_level]?.badge ?? "text-white"
            }
          >
            LL{offer.trader_level}
          </span>
        </span>
        {(reward.quantity > 1 || offer.rewards.length > 1) && (
          <span className="absolute bottom-1 right-1 rounded border border-white/40 bg-gray-950/95 px-1.5 py-0.5 font-mono text-xs font-bold leading-4 text-white shadow-md">
            {offer.rewards.length > 1
              ? `+${offer.rewards.length - 1}`
              : `×${reward.quantity}`}
          </span>
        )}
      </button>
      {position &&
        createPortal(
          <div
            id={id}
            role="tooltip"
            style={position}
            className="pointer-events-none fixed z-40 max-h-[min(340px,80vh)] w-80 max-w-[calc(100vw-24px)] overflow-hidden rounded-lg border border-line bg-surface p-4 text-foreground shadow-xl"
          >
            <p className="mb-3 text-sm font-bold">{name}</p>
            <OfferDetails
              offer={offer}
              locale={locale}
              labels={labels}
              compact
            />
          </div>,
          document.body,
        )}
    </>
  );
}
