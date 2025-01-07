interface ArmBand {
  id: string;
  name: string;
  short_name: string;
  weight: string;
  image: string;
}

export interface ArmBandList {
  armBandList: ArmBand[];
}
