export interface MinigameTabTypes {
  setTabState: (val: string) => void;
  tabState: string;
}

export interface MinigameNavTypes {
  score: number;
  playTime: number;
  onClickReset: () => void;
}
