import type { Locale } from "@/i18n/config";

export interface ItemListEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  width: number;
  height: number;
}

export interface ItemListLabels {
  title: string;
  description: string;
  searchPlaceholder: string;
  totalLabel: string;
  sizeLabel: string;
  noResultsLabel: string;
  locale: Locale;
}

export interface ItemListPageProps {
  itemType: string;
  items: ItemListEntry[];
  labels: ItemListLabels;
}
