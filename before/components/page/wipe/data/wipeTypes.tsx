export interface WipeClient {
  wipeList: WipeData[];
}

interface WipeData {
  id: number;
  season_start: string;
  season_end: string;
  patch_version: string;
}
