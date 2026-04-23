import type { RngItemEntry } from "@/types/api/price";

export interface ProgressTrackedItem {
  id: string;
  progress_type: string;
  update_time: string;
  item: RngItemEntry;
}

export interface ProgressItemResponse {
  allKappaItemList: ProgressTrackedItem[];
  allRebirthList: ProgressTrackedItem[];
  userKappaList: ProgressTrackedItem[];
  userRebirthList: ProgressTrackedItem[];
}
