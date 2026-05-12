import type { HomeNewsItem } from "@/types/api/home";

export interface HomeSectionSummary {
  title: string;
  description: string;
}

export interface HomeNewsSection {
  id: string;
  title: string;
  description: string;
  items: HomeNewsItem[];
}
