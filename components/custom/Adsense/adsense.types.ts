import React from "react";

export interface AdsenseTypes {
  pId: string;
}

export interface AdBannerTypes {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
  style?: React.CSSProperties;
}
