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

export interface ItemTypeTab {
  href: string;
  label: string;
  slug: string;
}

export interface ItemListPageProps {
  itemType: string;
  itemTabs: ItemTypeTab[];
  items: ItemListEntry[];
  labels: ItemListLabels;
}
