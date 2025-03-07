interface Headset {
  id: string;
  name: string;
  image: string;
  width: number;
  height: number;
}

export interface HeadsetList {
  headsetList: Headset[];
}
