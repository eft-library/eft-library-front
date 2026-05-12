import type { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
};

export const siteName = "EFT Library";

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: MetadataInput): Metadata {
  const normalizedTitle = title.includes(siteName)
    ? title
    : `${title} - ${siteName}`;
  const url = path ?? "/";
  const images = image ? [{ url: image }] : undefined;

  return {
    title: normalizedTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: normalizedTitle,
      description,
      url,
      siteName,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: normalizedTitle,
      description,
      images: image ? [image] : undefined,
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function fallbackMetadata(title = siteName): Metadata {
  return createPageMetadata({
    title,
    description:
      "Escape from Tarkov 정보를 한곳에서 확인할 수 있는 EFT Library입니다.",
  });
}

export function stripHtml(value: string | null | undefined) {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(value: string, maxLength = 155) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}
