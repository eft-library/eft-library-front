interface ArmBand {
  id: string;
  name: string;
  short_name: string;
  weight: string;
  width: number;
  height: number;
  image: string;
}

export interface ArmBandList {
  armBandList: ArmBand[];
}
