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

export interface RngScoreSaveRequest {
  nickname: string;
  score: number;
  game_type: "RNG-ITEM";
}

export interface RngScoreSaveResponse {
  id: number;
  nickname: string;
  score: number;
  game_type: "RNG-ITEM";
  create_time: string;
}

export interface RngMyRankRequest {
  score: number;
}
