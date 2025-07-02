import type { InformationInfo } from "../information/informationTypes";

export interface InformationInfoDetail {
  information_group: InformationInfo[];
  information: InformationInfo;
}

export interface InformationDetailClient {
  informationInfo: InformationInfoDetail;
  routeLink: string;
}
