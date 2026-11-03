"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { TraderOffer } from "@/types/api/trader";
import type { TraderCopy } from "../copy";
import { getTraderName } from "../copy";

export function offerName(offer: TraderOffer, locale: Locale) {
  return offer.rewards
    .map(
      ({ item, quantity }) =>
        `${pickLocalizedText(item, locale)}${quantity > 1 ? ` × ${quantity}` : ""}`,
    )
    .join(" / ");
}

export function OfferDetails({
  offer,
  locale,
  labels,
  compact = false,
}: {
  offer: TraderOffer;
  locale: Locale;
  labels: TraderCopy;
  compact?: boolean;
}) {
  const format = new Intl.NumberFormat(locale);
  return (
    <div className="space-y-5 text-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
        <span>
          {getTraderName(offer.trader, locale)} · LL{offer.trader_level}
        </span>
        <span className="rounded bg-orange-50 px-2 py-1 font-semibold text-orange-800 dark:bg-orange-500/15 dark:text-orange-300">
          {labels[offer.offer_type]}
        </span>
      </div>
      <div className="flex justify-between gap-3">
        <span className="text-gray-600 dark:text-gray-300">{labels.mode}</span>
        <strong>
          {offer.game_mode === "pvp-season"
            ? labels.season
            : offer.game_mode.toUpperCase()}
        </strong>
      </div>
      {!compact && (
        <section>
          <h3 className="mb-2 font-bold">{labels.rewards}</h3>
          {offer.rewards.map(({ item, quantity }, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-3 border-b border-line py-2"
            >
              <Image
                src={item.image}
                alt=""
                width={64}
                height={64}
                unoptimized
                className="h-14 w-14 rounded bg-surface-elevated object-contain"
              />
              <Link
                href={`/item/info/${item.normalized_name}`}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="min-w-0 flex-1 hover:text-orange-600 hover:underline dark:hover:text-orange-300"
              >
                {pickLocalizedText(item, locale)}
              </Link>
              <span className="font-mono">× {format.format(quantity)}</span>
            </div>
          ))}
        </section>
      )}
      <section>
        <h3 className="mb-2 font-bold">{labels.costs}</h3>
        {offer.costs.map(({ item, quantity }, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-3 border-b border-line py-2"
          >
            {!compact && (
              <Image
                src={item.image}
                alt=""
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 rounded bg-surface-elevated object-contain"
              />
            )}
            {compact ? (
              <span className="min-w-0 flex-1">
                {pickLocalizedText(item, locale)}
              </span>
            ) : (
              <Link
                href={`/item/info/${item.normalized_name}`}
                target="_blank"
                rel="noopener noreferrer"
                prefetch={false}
                className="min-w-0 flex-1 hover:text-orange-600 hover:underline dark:hover:text-orange-300"
              >
                {pickLocalizedText(item, locale)}
              </Link>
            )}
            <strong className="shrink-0 font-mono text-orange-700 dark:text-orange-300">
              × {format.format(quantity)}
            </strong>
          </div>
        ))}
      </section>
      <div className="flex justify-between gap-3">
        <span className="text-gray-600 dark:text-gray-300">{labels.limit}</span>
        <strong>
          {offer.is_unlimited
            ? labels.unlimited
            : offer.buy_limit === null
              ? labels.unknown
              : format.format(offer.buy_limit)}
        </strong>
      </div>
      {offer.task_unlocks.length > 0 && (
        <section>
          <h3 className="mb-2 font-bold">{labels.quests}</h3>
          {offer.task_unlocks.map((quest) =>
            compact ? (
              <p key={quest.quest_id}>{pickLocalizedText(quest, locale)}</p>
            ) : (
              <Link
                key={quest.quest_id}
                href={`/quest/detail/${quest.normalized_name}`}
                className="block py-1 text-orange-700 underline underline-offset-4 dark:text-orange-300"
              >
                {pickLocalizedText(quest, locale)}
              </Link>
            ),
          )}
        </section>
      )}
    </div>
  );
}

export function OfferDialog({
  offer,
  locale,
  labels,
  onClose,
}: {
  offer: TraderOffer | null;
  locale: Locale;
  labels: TraderCopy;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = offer !== null;
  useEffect(() => {
    if (!isOpen) return;
    const dialog = ref.current;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="trader-offer-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }
      }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-xl border border-line bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/65"
    >
      {offer && (
        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 id="trader-offer-title" className="text-xl font-bold">
              {offerName(offer, locale)}
            </h2>
            <button
              type="button"
              autoFocus
              onClick={() => ref.current?.close()}
              className="shrink-0 rounded-md border border-line bg-surface-elevated px-3 py-2 text-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              {labels.close}
            </button>
          </div>
          <OfferDetails offer={offer} locale={locale} labels={labels} />
        </div>
      )}
    </dialog>
  );
}
