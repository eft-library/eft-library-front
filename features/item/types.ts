import type { Locale } from "@/i18n/config";
import type { AmmoInfo } from "@/types/api/item-info";

export interface ItemListEntry {
  id: string;
  normalized_name: string;
  name_en: string;
  name_ko: string;
  name_ja: string;
  image: string;
  width: number;
  height: number;
  ammo_info?: AmmoInfo;
}

export interface ItemListLabels {
  title: string;
  description: string;
  searchPlaceholder: string;
  totalLabel: string;
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
