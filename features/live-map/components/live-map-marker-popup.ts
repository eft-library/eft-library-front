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

function createMarkerPopupHtml({
  description,
  detailTexts,
  images,
  location,
  title,
  titleImage,
}: {
  description: string;
  detailTexts?: string[];
  images: Array<{ alt: string; description: string; src: string }>;
  location: string;
  title: string;
  titleImage?: string | null;
}) {
  const firstImage = images[0];
  const activeLocation = firstImage?.description || location;
  const textOnlyDetailTexts = !firstImage ? (detailTexts ?? []) : [];
  const hasTextOnlyDetailList = textOnlyDetailTexts.length > 0;
  const thumbnails = images
    .map(
      (image, index) => `
        <button
          class="live-map-popup-thumb ${index === 0 ? "live-map-popup-thumb-active" : ""}"
          type="button"
          data-index="${index}"
          data-src="${escapeHtml(image.src)}"
          data-alt="${escapeHtml(image.alt)}"
          data-description="${escapeHtml(image.description)}"
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
              <img class="live-map-popup-image" src="${escapeHtml(firstImage.src)}" data-full-src="${escapeHtml(firstImage.src)}" alt="${escapeHtml(firstImage.alt)}" />
              ${images.length > 1 ? `<span class="live-map-popup-count">1 / ${images.length}</span>` : ""}
            </div>`
          : ""
      }
      <div class="live-map-popup-body live-map-popup-body-compact">
        ${
          firstImage
            ? `<p class="live-map-popup-location"${activeLocation ? "" : " hidden"}>${escapeHtml(activeLocation)}</p>`
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
  const image = point.image
    ? [{
        alt: title,
        description,
        src: point.image,
      }]
    : [];

  return createMarkerPopupHtml({
    description,
    images: image,
    location: getStaticCategoryLabel(point.category, copy),
    title,
  });
}
