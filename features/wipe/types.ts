import type { WipeSeasonResponse } from "@/types/api/news";

export interface WipePageLabels {
  title: string;
  description: string;
  version: string;
  start: string;
  end: string;
  days: string;
  active: string;
  completed: string;
  total: string;
}

export interface WipePageProps {
  seasons: WipeSeasonResponse[];
  labels: WipePageLabels;
}
