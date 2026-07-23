import type { Locale } from "@/i18n/config";
import type {
  EventInfo,
  LiveMapEventPoint,
  LiveMapPointDetail,
  LiveMapQuestInfo,
  LiveMapQuestPoint,
  LiveMapStaticPoint,
  LiveMapStoryPoint,
  StoryInfo,
} from "@/types/api/live-map";

import type { LiveMapCopy } from "./live-map-copy";
import {
  findNestedObjectiveByPoint,
  findQuestObjectiveByPointId,
  getLocalizedDetailText,
  getNestedObjectiveDescription,
  getPointDetailText,
  getQuestObjectiveDescription,
  getQuestObjectivePoint,
  getStaticCategoryLabel,
  localizedDescription,
  localizedName,
  localizedTitle,
} from "./live-map-data-utils";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPopupImages(details: LiveMapPointDetail[], locale: Locale) {
  return details
    .filter((detail) => detail.image)
    .map((detail) => ({
      alt: detail.description_en ?? detail.description_ko ?? detail.description_ja ?? "",
      description: getLocalizedDetailText(detail, locale),
      src: detail.image ?? "",
    }));
}

function getDetailTexts(details: LiveMapPointDetail[], locale: Locale) {
  return Array.from(
    new Set(
      details
        .map((detail) => getLocalizedDetailText(detail, locale))
        .filter(Boolean),
    ),
  );
}

function getStaticMetadataImages(point: LiveMapStaticPoint, locale: Locale) {
  const raw = point.metadata?.raw;

  const keyItems = raw && typeof raw === "object" && "keyItems" in raw && Array.isArray(raw.keyItems)
    ? raw.keyItems
    : raw && typeof raw === "object" && "keyItem" in raw && raw.keyItem && typeof raw.keyItem === "object"
      ? [raw.keyItem]
      : point.metadata?.key_item && typeof point.metadata.key_item === "object"
        ? [point.metadata.key_item]
        : [];

  return Array.from(
    new Map(
      keyItems.flatMap((item) => {
        if (!item || typeof item !== "object" || !("image" in item)) {
          return [];
        }

        const image = typeof item.image === "string" ? item.image.trim() : "";
        const nameKeys = locale === "ko"
          ? ["name_ko", "nameKo", "name_en", "nameEn", "name"]
          : locale === "ja"
            ? ["name_ja", "nameJa", "name_en", "nameEn", "name"]
            : ["name_en", "nameEn", "name"];
        const name = nameKeys.reduce<string>((result, key) => {
          if (result || !(key in item)) {
            return result;
          }

          const value = item[key as keyof typeof item];
          return typeof value === "string" ? value.trim() : "";
        }, "");
        const normalizedName = ["normalized_name", "normalizedName"].reduce<string>(
          (result, key) => {
            if (result || !(key in item)) {
              return result;
            }

            const value = item[key as keyof typeof item];
            return typeof value === "string" ? value.trim() : "";
          },
          "",
        );

        if (!image) {
          return [];
        }

        return [[image, {
          alt: name,
          description: name,
          fit: "contain" as const,
          href: normalizedName ? `/item/info/${encodeURIComponent(normalizedName)}` : undefined,
          src: image,
        }] as const];
      }),
    ).values(),
  );
}

function createMarkerPopupHtml({
  description,
  detailTexts,
  images,
  imageLinkLabel,
  location,
  title,
  titleImage,
}: {
  description: string;
  detailTexts?: string[];
  images: Array<{
    alt: string;
    description: string;
    fit?: "contain" | "cover";
    href?: string;
    src: string;
  }>;
  imageLinkLabel?: string;
  location: string;
  title: string;
  titleImage?: string | null;
}) {
  const firstImage = images[0];
  const activeLocation = firstImage ? firstImage.description : location;
  const textOnlyDetailTexts = !firstImage ? (detailTexts ?? []) : [];
  const hasTextOnlyDetailList = textOnlyDetailTexts.length > 0;
  const thumbnails = images
    .map(
      (image, index) => `
        <button
          class="live-map-popup-thumb ${image.fit === "contain" ? "live-map-popup-thumb-contain" : ""} ${index === 0 ? "live-map-popup-thumb-active" : ""}"
          type="button"
          title="${escapeHtml(image.alt)}"
          data-index="${index}"
          data-src="${escapeHtml(image.src)}"
          data-alt="${escapeHtml(image.alt)}"
          data-description="${escapeHtml(image.description)}"
          data-fit="${image.fit ?? "cover"}"
          data-href="${escapeHtml(image.href ?? "")}"
        >
          <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" />
        </button>
      `,
    )
    .join("");

  return `
    <div class="live-map-popup-card">
      <div class="live-map-popup-header">
        ${
          titleImage
            ? `<img class="live-map-popup-avatar" src="${escapeHtml(titleImage)}" alt="" />`
            : ""
        }
        <strong>${escapeHtml(title)}</strong>
      </div>
      <div class="live-map-popup-body">
        ${
          description
            ? `<p class="live-map-popup-description">${escapeHtml(description)}</p>`
            : ""
        }
      </div>
      ${
        firstImage
          ? `<div class="live-map-popup-media">
              <img class="live-map-popup-image ${firstImage.fit === "contain" ? "live-map-popup-image-contain" : ""}" src="${escapeHtml(firstImage.src)}" data-full-src="${escapeHtml(firstImage.src)}" data-fit="${firstImage.fit ?? "cover"}" alt="${escapeHtml(firstImage.alt)}" />
              ${images.length > 1 ? `<span class="live-map-popup-count">1 / ${images.length}</span>` : ""}
            </div>`
          : ""
      }
      <div class="live-map-popup-body live-map-popup-body-compact">
        ${
          firstImage
            ? firstImage.href
              ? `<a class="live-map-popup-location live-map-popup-item-link" href="${escapeHtml(firstImage.href)}" target="_blank" rel="noopener noreferrer"${activeLocation ? "" : " hidden"}>
                  <span class="live-map-popup-location-text">${escapeHtml(activeLocation)}</span>
                  <span class="live-map-popup-item-link-label">${escapeHtml(imageLinkLabel ?? "Detail")} ↗</span>
                </a>`
              : `<p class="live-map-popup-location"${activeLocation ? "" : " hidden"}>${escapeHtml(activeLocation)}</p>`
            : activeLocation && !hasTextOnlyDetailList
              ? `<p class="live-map-popup-location">${escapeHtml(activeLocation)}</p>`
              : ""
        }
        ${
          hasTextOnlyDetailList
            ? `<div class="live-map-popup-detail-list">${textOnlyDetailTexts
                .map((text) => `<p class="live-map-popup-location">${escapeHtml(text)}</p>`)
                .join("")}</div>`
            : ""
        }
      </div>
      ${thumbnails ? `<div class="live-map-popup-thumbs">${thumbnails}</div>` : ""}
    </div>
  `;
}

export function getQuestPointPopupHtml(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return undefined;
  }

  return createMarkerPopupHtml({
    description: point.quest_info.objective
      ? localizedDescription(point.quest_info.objective as unknown as Record<string, unknown>, locale)
      : "",
    images: [],
    location: "",
    title: point.quest_info.quest
      ? localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale)
      : point.id,
    titleImage: point.quest_info.trader?.image,
  });
}

export function getQuestDetailPointPopupHtml(
  point: LiveMapQuestPoint,
  info: LiveMapQuestInfo,
  locale: Locale,
) {
  const objective = findQuestObjectiveByPointId(info, point.id);
  const selectedPoint = getQuestObjectivePoint(objective, point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getQuestObjectiveDescription(objective, locale),
    detailTexts: getDetailTexts(details, locale),
    images: getPopupImages(details, locale),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedName(info.quest as unknown as Record<string, unknown>, locale),
    titleImage: info.trader?.image,
  });
}

export function getStoryPointPopupHtml(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return undefined;
  }

  const description =
    (point.story_info.objective
      ? localizedDescription(point.story_info.objective as unknown as Record<string, unknown>, locale)
      : "") ||
    (point.story_info.requirement
      ? localizedDescription(point.story_info.requirement as unknown as Record<string, unknown>, locale)
      : "");
  const title = point.story_info.story
    ? localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale)
    : point.story_id;

  return createMarkerPopupHtml({
    description,
    images: [],
    location: "",
    title,
  });
}

export function getStoryDetailPointPopupHtml(
  point: LiveMapStoryPoint,
  info: StoryInfo,
  locale: Locale,
) {
  const objective = findNestedObjectiveByPoint(
    info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const requirement = objective
    ? null
    : info.requirements.find((entry) =>
        entry.id === point.requirement_id ||
        entry.id === point.objective_id ||
        (entry.live_map_points ?? []).some((requirementPoint) => requirementPoint.id === point.id),
      );
  const selectedRequirementPoint = requirement?.live_map_points?.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? selectedRequirementPoint?.details ?? [];
  const description = objective
    ? getNestedObjectiveDescription(objective, locale)
    : requirement
      ? localizedDescription(requirement as unknown as Record<string, unknown>, locale)
      : "";

  return createMarkerPopupHtml({
    description,
    detailTexts: getDetailTexts(details, locale),
    images: getPopupImages(details, locale),
    location: getPointDetailText(selectedPoint ?? selectedRequirementPoint, locale),
    title: localizedTitle(info.story as unknown as Record<string, unknown>, locale),
  });
}

export function getEventPointPopupHtml(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return undefined;
  }

  return createMarkerPopupHtml({
    description: "",
    images: [],
    location: "",
    title: localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale),
    titleImage: point.event_info.trader?.image,
  });
}

export function getEventDetailPointPopupHtml(
  point: LiveMapEventPoint,
  info: EventInfo,
  locale: Locale,
) {
  const objective = findNestedObjectiveByPoint(
    info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getNestedObjectiveDescription(objective, locale),
    detailTexts: getDetailTexts(details, locale),
    images: getPopupImages(details, locale),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedTitle(info.event as unknown as Record<string, unknown>, locale),
    titleImage: info.trader?.image,
  });
}

export function getStaticPointPopupHtml(
  point: LiveMapStaticPoint,
  locale: Locale,
  copy: LiveMapCopy,
) {
  const title = localizedName(point as unknown as Record<string, unknown>, locale);
  const description = localizedDescription(point as unknown as Record<string, unknown>, locale);
  const metadataImages = getStaticMetadataImages(point, locale);
  const usesItemImagePresentation =
    point.category === "key_spawn" ||
    point.category === "keycard_spawn" ||
    point.category === "locked_door" ||
    point.category === "locked_container";
  const images = metadataImages.length > 0
    ? metadataImages
    : point.image
    ? [{
        alt: title,
        description,
        fit: usesItemImagePresentation ? "contain" as const : "cover" as const,
        src: point.image,
      }]
    : [];

  return createMarkerPopupHtml({
    description,
    images,
    imageLinkLabel: copy.questDetailPage,
    location: getStaticCategoryLabel(point.category, copy),
    title,
  });
}
