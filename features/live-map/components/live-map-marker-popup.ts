import type { Locale } from "@/i18n/config";
import type {
  LiveMapEventPoint,
  LiveMapPointDetail,
  LiveMapQuestPoint,
  LiveMapStaticPoint,
  LiveMapStoryPoint,
} from "@/types/api/live-map";

import type { LiveMapCopy } from "./live-map-copy";
import {
  findNestedObjectiveByPoint,
  findQuestObjectiveByPointId,
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

function getPopupImages(details: LiveMapPointDetail[]) {
  return details
    .filter((detail) => detail.image)
    .map((detail) => ({
      alt: detail.description_en ?? detail.description_ko ?? detail.description_ja ?? "",
      src: detail.image ?? "",
    }));
}

function createMarkerPopupHtml({
  description,
  images,
  location,
  title,
  titleImage,
}: {
  description: string;
  images: Array<{ alt: string; src: string }>;
  location: string;
  title: string;
  titleImage?: string | null;
}) {
  const firstImage = images[0];
  const thumbnails = images
    .map(
      (image, index) => `
        <button
          class="live-map-popup-thumb ${index === 0 ? "live-map-popup-thumb-active" : ""}"
          type="button"
          data-index="${index}"
          data-src="${escapeHtml(image.src)}"
          data-alt="${escapeHtml(image.alt)}"
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
        ${location ? `<p class="live-map-popup-location">${escapeHtml(location)}</p>` : ""}
      </div>
      ${thumbnails ? `<div class="live-map-popup-thumbs">${thumbnails}</div>` : ""}
    </div>
  `;
}

export function getQuestPointPopupHtml(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return undefined;
  }

  const objective = findQuestObjectiveByPointId(point.quest_info, point.id);
  const selectedPoint = getQuestObjectivePoint(objective, point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getQuestObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale),
    titleImage: point.quest_info.trader?.image,
  });
}

export function getStoryPointPopupHtml(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return undefined;
  }

  const objective = findNestedObjectiveByPoint(
    point.story_info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getNestedObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale),
  });
}

export function getEventPointPopupHtml(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return undefined;
  }

  const objective = findNestedObjectiveByPoint(
    point.event_info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getNestedObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale),
    titleImage: point.event_info.trader?.image,
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
